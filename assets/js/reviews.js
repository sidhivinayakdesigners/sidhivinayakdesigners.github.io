(function() {
    // ==========================================
    // CONFIGURATION
    // Replace with your real Google Maps API Key
    const API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';
    const PLACE_ID = 'ChIJi0LtzwvB5zsRsy_3CzZv6l8';
    // ==========================================

    if (API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY') {
        console.warn('Google Maps API Key is not set. Using static fallback reviews.');
        return;
    }

    // Dynamically load Google Maps Places Library
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeReviews;
    document.head.appendChild(script);

    function initializeReviews() {
        const container = document.getElementById('reviews-container');
        if (!container) return;

        // Initialize Places Service using a dummy div
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        
        service.getDetails({
            placeId: PLACE_ID,
            fields: ['reviews', 'rating', 'user_ratings_total']
        }, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews && place.reviews.length > 0) {
                renderReviews(place.reviews);
                updateSchemaReviews(place.reviews, place.rating, place.user_ratings_total);
            } else {
                console.error('Failed to fetch place details or no reviews found. Status:', status);
            }
        });
    }

    function renderReviews(reviews) {
        const container = document.getElementById('reviews-container');
        if (!container) return;

        container.innerHTML = ''; // Clear fallback reviews

        // Google Places API returns up to 5 reviews
        reviews.forEach((review, index) => {
            const delay = (index + 1) * 100;
            const rating = Math.round(review.rating);
            
            // Build stars HTML
            let starsHtml = '';
            for (let i = 0; i < 5; i++) {
                if (i < rating) {
                    starsHtml += '<i class="fas fa-star"></i>';
                } else {
                    starsHtml += '<i class="far fa-star"></i>';
                }
            }

            const col = document.createElement('div');
            col.className = 'col-md-4';
            col.setAttribute('data-aos', 'fade-up');
            col.setAttribute('data-aos-delay', delay.toString());

            const card = `
                <div class="premium-card p-4 h-100 d-flex flex-column justify-content-between">
                    <div>
                        <div class="d-flex align-items-center gap-3 mb-3">
                            <img src="${review.profile_photo_url || 'https://lh3.googleusercontent.com/a/default-user-icon'}" 
                                 alt="${review.author_name}" 
                                 class="rounded-circle" 
                                 width="40" 
                                 height="40" 
                                 onerror="this.src='https://lh3.googleusercontent.com/a/default-user-icon'">
                            <div>
                                <h5 class="text-white h6 font-luxury mb-0">${review.author_name}</h5>
                                <small class="text-muted">${review.relative_time_description}</small>
                            </div>
                        </div>
                        <div class="d-flex text-gold mb-3">
                            ${starsHtml}
                        </div>
                        <p class="small text-muted italic mb-0">"${review.text}"</p>
                    </div>
                </div>
            `;
            col.innerHTML = card;
            container.appendChild(col);
        });

        // Re-initialize AOS if it's available
        if (window.AOS) {
            window.AOS.refresh();
        }
    }

    function updateSchemaReviews(reviews, rating, totalReviews) {
        // Find existing LocalBusiness schema and update it dynamically for search crawlers
        const scripts = document.querySelectorAll('script[type="application/ld+json"]');
        scripts.forEach(script => {
            try {
                const json = JSON.parse(script.text);
                if (json['@type'] && (json['@type'] === 'LocalBusiness' || (Array.isArray(json['@type']) && json['@type'].includes('LocalBusiness')))) {
                    // Update rating and reviews dynamically
                    json.aggregateRating = {
                        "@type": "AggregateRating",
                        "ratingValue": rating.toString(),
                        "reviewCount": totalReviews.toString()
                    };
                    
                    json.review = reviews.map(r => ({
                        "@type": "Review",
                        "author": {
                            "@type": "Person",
                            "name": r.author_name
                        },
                        "reviewBody": r.text,
                        "reviewRating": {
                            "@type": "Rating",
                            "ratingValue": r.rating.toString(),
                            "bestRating": "5"
                        }
                    }));

                    script.text = JSON.stringify(json, null, 2);
                }
            } catch (e) {
                // Ignore parsing errors for other schemas
            }
        });
    }
})();

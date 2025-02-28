document.addEventListener('DOMContentLoaded', function() {
    const fetchButton = document.getElementById('fetch-products');
    const productsContainer = document.getElementById('products-container');
    
    fetchButton.addEventListener('click', fetchAndDisplayProducts);
    
    function fetchAndDisplayProducts() {
        productsContainer.classList.remove('hidden');
        productsContainer.innerHTML = '<div class="loading">Loading products...</div>';
        
        fetch('https://dummyjson.com/products?limit=10')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayProducts(data.products);
            })
            .catch(error => {
                productsContainer.innerHTML = `
                    <div class="error">
                        <p>Failed to load products: ${error.message}</p>
                        <button class="cta-button" onclick="location.reload()">Try Again</button>
                    </div>
                `;
                console.error('Error fetching products:', error);
            });
    }
    
    function displayProducts(products) {
        productsContainer.innerHTML = '';
        
        if (!products || products.length === 0) {
            productsContainer.innerHTML = '<div class="no-products">No products found.</div>';
            return;
        }
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            const ratingStars = generateRatingStars(product.rating);
            
            productCard.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}" class="product-image">
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-meta">
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <div class="product-rating">
                            <span class="rating-stars">${ratingStars}</span>
                            <span>${product.rating.toFixed(1)}</span>
                        </div>
                    </div>
                </div>
            `;
            
            productsContainer.appendChild(productCard);
        });
    }
    
    function generateRatingStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let starsHTML = '';
        
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '★';
        }
        
        if (hasHalfStar) {
            starsHTML += '☆';
        }
        
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '☆';
        }
        
        return starsHTML;
    }
});
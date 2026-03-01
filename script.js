document.addEventListener('DOMContentLoaded', function() {
    // Cart functionality
    let cart = [];
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            
            // Add item to cart
            cart.push({ name, price });
            updateCart();
            
            // Show notification
            alert(`${name} added to cart!`);
        });
    });

    function updateCart() {
        // Clear cart display
        cartItemsElement.innerHTML = '';
        
        // Calculate total
        let total = 0;
        
        // Display each item
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItemsElement.appendChild(itemElement);
            total += item.price;
        });
        
        // Update total
        cartTotalElement.textContent = total.toFixed(2);
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    // Checkout functionality
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        const confirmation = confirm(`Your total is $${total.toFixed(2)}. Place order?`);
        
        if (confirmation) {
            alert('Order placed successfully! Thank you for your purchase.');
            cart = [];
            updateCart();
        }
    });

    // Contact form functionality
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active link
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
});
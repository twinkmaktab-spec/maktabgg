// ============================================
// USER REGISTRATION - Simple Modal on First Visit
// ============================================

console.log('user.js loaded');

// Check if user is registered
function checkUserRegistration() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
        // User not registered - show modal
        showRegistrationModal();
    } else {
        // User already registered
        console.log('Welcome back:', user.firstName);
        updateUserUI(user);
    }
}

// Show Registration Modal
function showRegistrationModal() {
    const modal = document.getElementById('userRegModal');
    if (modal) {
        modal.classList.add('show');
    }
}

// Register User
function registerUser(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('regFirstName').value.trim();
    const lastName = document.getElementById('regLastName').value.trim();
    const birthYear = document.getElementById('regBirthYear').value;
    
    if (!firstName || !lastName || !birthYear) {
        alert('❌ Iltimos, barcha maydonlarni to\'ldiring!');
        return;
    }
    
    const user = {
        id: Date.now(),
        firstName: firstName,
        lastName: lastName,
        birthYear: birthYear,
        registeredDate: new Date().toLocaleDateString('uz-UZ')
    };
    
    console.log('User registered:', user);
    
    try {
        localStorage.setItem('user', JSON.stringify(user));
        
        // Close modal
        const modal = document.getElementById('userRegModal');
        if (modal) {
            modal.classList.remove('show');
        }
        
        // Update UI
        updateUserUI(user);
        
        alert(`✅ Xush kelibsiz, ${user.firstName}!`);
    } catch (error) {
        console.error('Error registering user:', error);
        alert('❌ Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
    }
}

// Update UI with user info
function updateUserUI(user) {
    const userInfo = document.getElementById('userInfo');
    if (userInfo) {
        const age = new Date().getFullYear() - parseInt(user.birthYear);
        userInfo.innerHTML = `
            <div class="user-card">
                <div class="user-avatar">${user.firstName.charAt(0).toUpperCase()}</div>
                <div class="user-details">
                    <strong>${user.firstName} ${user.lastName}</strong>
                    <small>${age} yosh</small>
                </div>
                <button type="button" class="user-logout" onclick="logoutUser()" title="Chiqish">✕</button>
            </div>
        `;
    }
}

// Logout User
function logoutUser() {
    try {
        localStorage.removeItem('user');
        console.log('User logged out');
        location.reload();
    } catch (error) {
        console.error('Error logging out:', error);
    }
}

// Fill birth year select
function fillBirthYears() {
    const select = document.getElementById('regBirthYear');
    if (!select) return;
    
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 100;
    
    for (let year = currentYear; year >= startYear; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        select.appendChild(option);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    fillBirthYears();
    checkUserRegistration();
});
// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Phone validation regex (Vietnamese format)
    const phoneRegex = /^(\+84[0-9]{9}|0[0-9]{9})$/;

    // Form field validators
    const validators = {
        name: function(value) {
            if (value.trim().length < 2) {
                return 'Họ và tên phải có ít nhất 2 ký tự';
            }
            if (value.trim().length > 100) {
                return 'Họ và tên không được vượt quá 100 ký tự';
            }
            return '';
        },
        email: function(value) {
            if (!value.trim()) {
                return 'Email là bắt buộc';
            }
            if (!emailRegex.test(value.trim())) {
                return 'Email không hợp lệ';
            }
            return '';
        },
        phone: function(value) {
            if (value.trim() && !phoneRegex.test(value.trim())) {
                return 'Số điện thoại không hợp lệ (ví dụ: 0912345678 hoặc +84912345678)';
            }
            return '';
        },
        subject: function(value) {
            if (value.trim().length < 3) {
                return 'Chủ đề phải có ít nhất 3 ký tự';
            }
            if (value.trim().length > 200) {
                return 'Chủ đề không được vượt quá 200 ký tự';
            }
            return '';
        },
        message: function(value) {
            if (value.trim().length < 10) {
                return 'Tin nhắn phải có ít nhất 10 ký tự';
            }
            if (value.trim().length > 2000) {
                return 'Tin nhắn không được vượt quá 2000 ký tự';
            }
            return '';
        }
    };

    // Validate single field
    function validateField(fieldName, value) {
        const errorElement = document.getElementById(fieldName + 'Error');
        const formGroup = errorElement.closest('.form-group');
        
        if (validators[fieldName]) {
            const errorMessage = validators[fieldName](value);
            
            if (errorMessage) {
                errorElement.textContent = errorMessage;
                formGroup.classList.add('error');
                return false;
            } else {
                errorElement.textContent = '';
                formGroup.classList.remove('error');
                return true;
            }
        }
        return true;
    }

    // Add real-time validation
    const formFields = ['name', 'email', 'phone', 'subject', 'message'];
    formFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            // Validate on blur (when user leaves the field)
            field.addEventListener('blur', function() {
                validateField(fieldName, this.value);
            });

            // Clear error on input (when user starts typing)
            field.addEventListener('input', function() {
                const errorElement = document.getElementById(fieldName + 'Error');
                const formGroup = errorElement.closest('.form-group');
                if (formGroup.classList.contains('error') && this.value.trim()) {
                    errorElement.textContent = '';
                    formGroup.classList.remove('error');
                }
            });
        }
    });

    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide any previous messages
        formMessage.className = 'form-message';
        formMessage.style.display = 'none';

        // Validate all fields
        let isValid = true;
        const formData = {};

        formFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                const value = field.value;
                formData[fieldName] = value;
                
                if (!validateField(fieldName, value)) {
                    isValid = false;
                }
            }
        });

        // If validation passes, simulate form submission
        if (isValid) {
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Đang gửi...';

            // Simulate API call (replace with actual API call in production)
            setTimeout(function() {
                // Log form data (in production, this would be sent to a server)
                console.log('Form submitted with data:', formData);

                // Show success message
                formMessage.textContent = 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';

                // Reset form
                contactForm.reset();

                // Clear all error states
                formFields.forEach(fieldName => {
                    const errorElement = document.getElementById(fieldName + 'Error');
                    const formGroup = errorElement.closest('.form-group');
                    errorElement.textContent = '';
                    formGroup.classList.remove('error');
                });

                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Gửi Tin Nhắn';

                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                // Hide success message after 5 seconds
                setTimeout(function() {
                    formMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        } else {
            // Show error message
            formMessage.textContent = 'Vui lòng kiểm tra và sửa các lỗi trong biểu mẫu.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';

            // Scroll to first error
            const firstError = contactForm.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            // Hide error message after 5 seconds
            setTimeout(function() {
                formMessage.style.display = 'none';
            }, 5000);
        }
    });

    // Prevent form submission on Enter key in text inputs (but allow in textarea)
    contactForm.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });
});

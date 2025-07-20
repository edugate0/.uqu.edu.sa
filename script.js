// Student Data
const studentData = {
    nationalId: '1137856454',
    name: 'عبدالملك حسن مرزوق المقاطي',
    phone: '0502779965',
    college: 'كلية العلوم',
    major: ' تكنولوجيا حماية البيئة',
    level: 'بكالوريوس',
    semester: 'الأول 1447هـ',
    fees: {
        registration: 1500,
        card: 500,
        total: 2000
    },
    bankInfo: {
        bank: 'البنك الراجحي',
        iban: 'SA7980000140608016213309'
    }
};

// Utility Functions
function showMessage(message, type = 'success') {
    let container = document.getElementById('messageContainer');
    
    // Create message container if it doesn't exist
    if (!container) {
        container = document.createElement('div');
        container.id = 'messageContainer';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
        `;
        document.body.appendChild(container);
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.style.cssText = `
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 12px 16px;
        margin-bottom: 10px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease-out;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 14px;
        line-height: 1.4;
        direction: rtl;
        text-align: right;
    `;
    messageDiv.textContent = message;

    container.appendChild(messageDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }
    }, 5000);
}

function validateNationalId(id) {
    // Remove any non-digit characters
    id = id.replace(/\D/g, '');
    
    // Check if it's exactly 10 digits
    if (id.length !== 10) {
        return false;
    }
    
    // Check if it starts with 1 or 2 (Saudi national ID format)
    if (!id.startsWith('1') && !id.startsWith('2')) {
        return false;
    }
    
    return true;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: 'SAR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Navigation Functions
function goToInquiry() {
    window.location.href = 'inquiry.html';
}

function goToConfirmation() {
    // Store student data in localStorage for confirmation page
    localStorage.setItem('studentData', JSON.stringify(studentData));
    window.location.href = 'confirmation.html';
}

function goToPayment() {
    localStorage.setItem('studentData', JSON.stringify(studentData));
    window.location.href = 'payment.html';
}

function goToReceipt() {
    localStorage.setItem('studentData', JSON.stringify(studentData));
    window.location.href = 'receipt.html';
}

function scrollToServices() {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Inquiry Page Functions
function initializeInquiryPage() {
    const inquiryForm = document.getElementById('inquiryForm');
    if (!inquiryForm) return;

    inquiryForm.addEventListener('submit', handleInquiry);
    
    // Add input formatting for national ID
    const nationalIdInput = document.getElementById('nationalId');
    if (nationalIdInput) {
        nationalIdInput.addEventListener('input', function(e) {
            // Only allow digits
            e.target.value = e.target.value.replace(/\D/g, '');
            
            // Limit to 10 digits
            if (e.target.value.length > 10) {
                e.target.value = e.target.value.slice(0, 10);
            }
        });
    }
}

function handleInquiry(event) {
    event.preventDefault();
    
    const nationalId = document.getElementById('nationalId').value.trim();
    const inquiryBtn = document.querySelector('.inquiry-btn');
    const btnText = inquiryBtn.querySelector('.btn-text');
    const btnLoader = inquiryBtn.querySelector('.btn-loader');
    
    // Validate input
    if (!validateNationalId(nationalId)) {
        showMessage('يرجى إدخال رقم هوية صحيح مكون من 10 أرقام', 'error');
        return;
    }
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoader.style.display = 'flex';
    inquiryBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        if (nationalId === studentData.nationalId) {
            // Show success result
            showInquiryResult(true);
            showMessage('تم العثور على بيانات القبول بنجاح', 'success');
        } else {
            // Show not found result
            showInquiryResult(false);
            showMessage('لم يتم العثور على بيانات قبول لهذا الرقم', 'error');
        }
        
        // Reset button
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        inquiryBtn.disabled = false;
    }, 2000);
}

function showInquiryResult(found) {
    const resultCard = document.getElementById('resultCard');
    if (!resultCard) return;
    
    if (found) {
        // Update result with student data
        document.getElementById('studentName').textContent = studentData.name;
        document.getElementById('studentId').textContent = studentData.nationalId;
        document.getElementById('studentPhone').textContent = studentData.phone;
        
        // Show success result
        const resultIcon = resultCard.querySelector('.result-icon');
        const statusBadge = resultCard.querySelector('.status-badge');
        
        resultIcon.className = 'result-icon success';
        resultIcon.textContent = '✅';
        statusBadge.className = 'status-badge accepted';
        
        resultCard.style.display = 'block';
        resultCard.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Show not found result
        resultCard.innerHTML = `
            <div class="result-header">
                <div class="result-icon error">❌</div>
                <h3>لم يتم العثور على بيانات</h3>
            </div>
            <div class="result-content">
                <p>لم يتم العثور على بيانات قبول لرقم الهوية المدخل. يرجى التأكد من صحة الرقم أو التواصل مع إدارة القبول.</p>
                <div class="result-actions">
                    <button class="btn btn-secondary" onclick="clearForm()">
                        <span>محاولة أخرى</span>
                    </button>
                </div>
            </div>
        `;
        resultCard.style.display = 'block';
        resultCard.scrollIntoView({ behavior: 'smooth' });
    }
}

function clearForm() {
    const form = document.getElementById('inquiryForm');
    const resultCard = document.getElementById('resultCard');
    
    if (form) form.reset();
    if (resultCard) resultCard.style.display = 'none';
}

function printResult() {
    window.print();
}

// Confirmation Page Functions
function initializeConfirmationPage() {
    const storedData = localStorage.getItem('studentData');
    if (!storedData) {
        showMessage('لم يتم العثور على بيانات الطالب. يرجى العودة للاستعلام أولاً', 'error');
        setTimeout(() => {
            window.location.href = 'inquiry.html';
        }, 3000);
        return;
    }
    
    const data = JSON.parse(storedData);
    updateConfirmationData(data);
    
    const confirmForm = document.getElementById('confirmForm');
    if (confirmForm) {
        confirmForm.addEventListener('submit', handleConfirmation);
    }
}

function updateConfirmationData(data) {
    // Update student information
    const elements = {
        'confirm-name': data.name,
        'confirm-id': data.nationalId,
        'confirm-phone': data.phone,
        'confirm-college': data.college,
        'confirm-major': data.major,
        'confirm-level': data.level,
        'confirm-semester': data.semester
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });
    
    // Update fees information
    const registrationFee = document.getElementById('registration-fee');
    const cardFee = document.getElementById('card-fee');
    const totalFee = document.getElementById('total-fee');
    
    if (registrationFee) registrationFee.textContent = formatCurrency(data.fees.registration);
    if (cardFee) cardFee.textContent = formatCurrency(data.fees.card);
    if (totalFee) totalFee.textContent = formatCurrency(data.fees.total);
}

function handleConfirmation(event) {
    event.preventDefault();
    
    const agreement = document.getElementById('agreement');
    if (!agreement || !agreement.checked) {
        showMessage('يجب الموافقة على الشروط والأحكام', 'error');
        return;
    }
    
    const confirmBtn = document.querySelector('.confirm-btn');
    const originalText = confirmBtn.innerHTML;
    
    // Show loading
    confirmBtn.innerHTML = '<div class="spinner"></div> جاري التأكيد...';
    confirmBtn.disabled = true;
    
    setTimeout(() => {
        // Mark as confirmed
        localStorage.setItem('admissionConfirmed', 'true');
        showMessage('تم تأكيد القبول بنجاح! سيتم توجيهك لصفحة السداد', 'success');
        
        setTimeout(() => {
            window.location.href = 'payment.html';
        }, 2000);
    }, 2000);
}

// Payment Page Functions
function initializePaymentPage() {
    const storedData = localStorage.getItem('studentData');
    if (!storedData) {
        showMessage('لم يتم العثور على بيانات الطالب', 'error');
        setTimeout(() => window.location.href = 'inquiry.html', 3000);
        return;
    }
    
    const data = JSON.parse(storedData);
    updatePaymentData(data);
}

function updatePaymentData(data) {
    // Update payment information
    const elements = {
        'payment-name': data.name,
        'payment-id': data.nationalId,
        'payment-registration-fee': formatCurrency(data.fees.registration),
        'payment-card-fee': formatCurrency(data.fees.card),
        'payment-total': formatCurrency(data.fees.total),
        'payment-bank': data.bankInfo.bank,
        'payment-iban': data.bankInfo.iban
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });
}

function copyIban() {
    const iban = studentData.bankInfo.iban;
    navigator.clipboard.writeText(iban).then(() => {
        showMessage('تم نسخ رقم الآيبان بنجاح', 'success');
    }).catch(() => {
        showMessage('فشل في نسخ رقم الآيبان', 'error');
    });
}

function downloadInvoice() {
    showMessage('سيتم تحميل الفاتورة قريباً', 'info');
    // Here you would implement actual PDF generation
}

// Receipt Page Functions
function initializeReceiptPage() {
    const storedData = localStorage.getItem('studentData');
    if (!storedData) {
        showMessage('لم يتم العثور على بيانات الطالب', 'error');
        setTimeout(() => window.location.href = 'inquiry.html', 3000);
        return;
    }
    
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleReceiptUpload);
    }
    
    const fileInput = document.getElementById('receiptFile');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
    }
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('filePreview');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    
    if (file) {
        fileName.textContent = file.name;
        fileSize.textContent = `${(file.size / 1024 / 1024).toFixed(2)} MB`;
        
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.innerHTML = `<img src="${e.target.result}" alt="معاينة الإيصال" style="max-width: 100%; height: auto; border-radius: 8px;">`;
            };
            reader.readAsDataURL(file);
        } else {
            preview.innerHTML = `<div class="file-icon">📄</div><p>ملف: ${file.name}</p>`;
        }
        
        document.getElementById('fileInfo').style.display = 'block';
    }
}

function handleReceiptUpload(event) {
    event.preventDefault();
    
    const fileInput = document.getElementById('receiptFile');
    const file = fileInput.files[0];
    
    if (!file) {
        showMessage('يرجى اختيار ملف الإيصال', 'error');
        return;
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
        showMessage('نوع الملف غير مدعوم. يرجى اختيار صورة أو ملف PDF', 'error');
        return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showMessage('حجم الملف كبير جداً. الحد الأقصى 5 ميجابايت', 'error');
        return;
    }
    
    const uploadBtn = document.querySelector('.upload-btn');
    const originalText = uploadBtn.innerHTML;
    
    // Show loading
    uploadBtn.innerHTML = '<div class="spinner"></div> جاري الرفع...';
    uploadBtn.disabled = true;
    
    // Simulate upload
    setTimeout(() => {
        localStorage.setItem('receiptUploaded', 'true');
        showMessage('تم رفع الإيصال بنجاح! سيتم مراجعته خلال 24 ساعة', 'success');
        
        // Show success state
        document.getElementById('uploadSection').style.display = 'none';
        document.getElementById('successSection').style.display = 'block';
        
        uploadBtn.innerHTML = originalText;
        uploadBtn.disabled = false;
    }, 3000);
}

// Initialize page based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'inquiry.html':
            initializeInquiryPage();
            break;
        case 'confirmation.html':
            initializeConfirmationPage();
            break;
        case 'payment.html':
            initializePaymentPage();
            break;
        case 'receipt.html':
            initializeReceiptPage();
            break;
        default:
            // Home page or other pages
            break;
    }
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation styles
const style = document.createElement('style');
style.textContent = `
    .spinner {
        width: 20px;
        height: 20px;
        border: 2px solid #f3f3f3;
        border-top: 2px solid #1B5E20;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        display: inline-block;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


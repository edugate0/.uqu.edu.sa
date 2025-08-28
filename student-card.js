// Student Card Management Functions

// Initialize student card page
function initializeStudentCardPage() {
    loadStudentData();
    checkPaymentStatus();
    generateStudentId();
    updateCardDisplay();
}

// Load student data from localStorage
function loadStudentData() {
    const storedData = localStorage.getItem('studentData');
    if (storedData) {
        window.currentStudent = JSON.parse(storedData);
    } else {
        // Fallback to default data
        window.currentStudent = {
            nationalId: '1137856454',
            name: 'عبدالملك حسن مرزوق المقاطي',
            phone: '0502779965',
            college: 'كلية العلوم والدراسات الانسانية',
            major: ' تكنولوجيا حماية البيئة',
            level: 'بكالوريوس'
        };
    }
}

// Generate student ID based on national ID
function generateStudentId() {
    if (!window.currentStudent.studentId) {
        // Generate student ID: 443 (year) + last 6 digits of national ID
        const nationalId = window.currentStudent.nationalId;
        const lastSixDigits = nationalId.slice(-6);
        window.currentStudent.studentId = '20251131630' ;
        
        // Save updated data
        localStorage.setItem('studentData', JSON.stringify(window.currentStudent));
    }
}

// Check payment status and update card availability
function checkPaymentStatus() {
    const paymentStatus = localStorage.getItem('paymentStatus');
    const receiptUploaded = localStorage.getItem('receiptUploaded');
    
    const cardStatus = document.getElementById('cardStatus');
    const blockedOverlay = document.getElementById('blockedOverlay');
    const printCardBtn = document.getElementById('printCardBtn');
    const downloadCardBtn = document.getElementById('downloadCardBtn');
    
    if (paymentStatus === 'completed' && receiptUploaded === 'true') {
        // Payment completed - unlock card
        cardStatus.className = 'card-status status-available';
        cardStatus.innerHTML = `
            <div class="status-icon">✅</div>
            <h2 class="status-title">البطاقة متاحة</h2>
            <p class="status-description">
                تم تأكيد سداد رسوم البطاقة الجامعية. يمكنك الآن عرض وطباعة بطاقتك الجامعية.
                احتفظ بالبطاقة معك دائماً داخل الحرم الجامعي.
            </p>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button class="action-btn" onclick="printCard()">
                    <span>🖨️</span>
                    طباعة البطاقة
                </button>
                <button class="action-btn secondary" onclick="downloadCard()">
                    <span>📄</span>
                    تحميل PDF
                </button>
            </div>
        `;
        
        // Remove blocked overlay
        if (blockedOverlay) {
            blockedOverlay.style.display = 'none';
        }
        
        // Enable action buttons
        if (printCardBtn) printCardBtn.disabled = false;
        if (downloadCardBtn) downloadCardBtn.disabled = false;
        
    } else {
        // Payment not completed - keep card blocked
        cardStatus.className = 'card-status status-pending';
        
        // Show blocked overlay
        if (blockedOverlay) {
            blockedOverlay.style.display = 'flex';
        }
        
        // Keep action buttons disabled
        if (printCardBtn) printCardBtn.disabled = true;
        if (downloadCardBtn) downloadCardBtn.disabled = true;
    }
}

// Update card display with student data
function updateCardDisplay() {
    if (!window.currentStudent) return;
    
    const elements = {
        'cardStudentName': window.currentStudent.name,
        'cardStudentId': window.currentStudent.studentId,
        'cardNationalId': window.currentStudent.nationalId,
        'cardCollege': window.currentStudent.college,
        'cardMajor': window.currentStudent.major.replace('بكالوريوس ', ''),
        'infoStudentId': window.currentStudent.studentId,
        'infoPhone': window.currentStudent.phone
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });
    
    // Update issue date to current date
    const issueDate = new Date().toLocaleDateString('ar-SA-u-ca-islamic');
    const infoIssueDate = document.getElementById('infoIssueDate');
    if (infoIssueDate) {
        infoIssueDate.textContent = issueDate;
    }
}

// Print student card
function printCard() {
    const paymentStatus = localStorage.getItem('paymentStatus');
    const receiptUploaded = localStorage.getItem('receiptUploaded');
    
    if (paymentStatus !== 'completed' || receiptUploaded !== 'true') {
        showMessage('يجب سداد رسوم البطاقة أولاً', 'error');
        return;
    }
    
    // Create print-friendly version
    const printWindow = window.open('', '_blank');
    const cardHTML = generatePrintableCard();
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <title>البطاقة الجامعية - جامعة أم القرى</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    margin: 0; 
                    padding: 20px; 
                    direction: rtl;
                    background: #f5f5f5;
                }
                .print-container {
                    max-width: 400px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                }
                .card-header {
                    background: linear-gradient(135deg, #1B5E20, #2E7D32);
                    color: white;
                    padding: 15px 20px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                .university-logo {
                    width: 50px;
                    height: 50px;
                    background: white;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    color: #1B5E20;
                    font-size: 0.8rem;
                }
                .university-info {
                    flex: 1;
                }
                .university-name {
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin-bottom: 2px;
                }
                .university-name-en {
                    font-size: 0.8rem;
                    opacity: 0.9;
                }
                .card-body {
                    padding: 20px;
                    display: flex;
                    gap: 20px;
                    align-items: center;
                }
                .student-photo {
                    width: 80px;
                    height: 100px;
                    background: #f0f0f0;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    border: 2px solid #ddd;
                }
                .student-info {
                    flex: 1;
                }
                .student-name {
                    font-size: 1.2rem;
                    font-weight: 700;
                    margin-bottom: 8px;
                    color: #333;
                }
                .student-details {
                    font-size: 0.85rem;
                    line-height: 1.6;
                }
                .detail-item {
                    margin-bottom: 4px;
                }
                .detail-label {
                    color: #666;
                    display: inline-block;
                    min-width: 80px;
                }
                .detail-value {
                    font-weight: 600;
                    color: #333;
                }
                .card-footer {
                    background: #f8f9fa;
                    padding: 10px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.8rem;
                    color: #666;
                    border-top: 1px solid #e0e0e0;
                }
                .card-number {
                    font-family: 'Courier New', monospace;
                    font-weight: 600;
                }
                @media print {
                    body { 
                        margin: 0; 
                        padding: 10mm;
                        background: white;
                    }
                    .print-container {
                        box-shadow: none;
                        border: 1px solid #333;
                    }
                }
            </style>
        </head>
        <body>
            ${cardHTML}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
    
    showMessage('تم إرسال البطاقة للطباعة', 'success');
}

// Generate printable card HTML
function generatePrintableCard() {
    if (!window.currentStudent) return '';
    
    return `
        <div class="print-container">
            <div class="card-header">
                <div class="university-logo">UQU</div>
                <div class="university-info">
                    <div class="university-name">جامعة أم القرى</div>
                    <div class="university-name-en">Umm Al-Qura University</div>
                </div>
                <div style="color: white; font-weight: 600; font-size: 0.9rem;">بطاقة طالب</div>
            </div>
            
            <div class="card-body">
                <div class="student-photo">👤</div>
                <div class="student-info">
                    <div class="student-name">${window.currentStudent.name}</div>
                    <div class="student-details">
                        <div class="detail-item">
                            <span class="detail-label">الرقم الجامعي:</span>
                            <span class="detail-value">${window.currentStudent.studentId}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">رقم الهوية:</span>
                            <span class="detail-value">${window.currentStudent.nationalId}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">الكلية:</span>
                            <span class="detail-value">${window.currentStudent.college}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">التخصص:</span>
                            <span class="detail-value">${window.currentStudent.major.replace('دبلوم ', '')}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card-footer">
                <div class="card-number">Card No: UQU-2024-001</div>
                <div>صالحة حتى: 1447/12/30هـ</div>
            </div>
        </div>
    `;
}

// Download card as PDF
function downloadCard() {
    const paymentStatus = localStorage.getItem('paymentStatus');
    const receiptUploaded = localStorage.getItem('receiptUploaded');
    
    if (paymentStatus !== 'completed' || receiptUploaded !== 'true') {
        showMessage('يجب سداد رسوم البطاقة أولاً', 'error');
        return;
    }
    
    showMessage('سيتم تطوير ميزة تحميل PDF قريباً', 'info');
    // In a real implementation, you would use a library like jsPDF or html2pdf
}

// Request new card (replacement)
function requestNewCard() {
    const confirmed = confirm('هل تريد طلب بطاقة بديلة؟ قد تتطلب رسوم إضافية.');
    
    if (confirmed) {
        showMessage('تم تسجيل طلب البطاقة البديلة. سيتم التواصل معك قريباً', 'info');
        
        // Store replacement request
        const requestData = {
            studentId: window.currentStudent.studentId,
            requestDate: new Date().toISOString(),
            reason: 'replacement',
            status: 'pending'
        };
        
        localStorage.setItem('cardReplacementRequest', JSON.stringify(requestData));
    }
}

// Navigation functions
function goToPayment() {
    window.location.href = 'payment.html';
}

function goToCourses() {
    window.location.href = 'courses.html';
}

function goToSchedule() {
    window.location.href = 'schedule.html';
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('student-card.html')) {
        initializeStudentCardPage();
    }
});


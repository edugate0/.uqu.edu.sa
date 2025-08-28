// Course data for Environmental Protection Technology Diploma
const coursesData = [
    {
        id: 'EPT101',
        name: 'مقدمة في تكنولوجيا حماية البيئة',
        code: 'EPT101',
        credits: 3,
        type: 'core',
        level: 1,
        description: 'مقدمة شاملة في مفاهيم حماية البيئة والتكنولوجيا المستخدمة في مراقبة ومعالجة التلوث البيئي.',
        instructor: 'د. أحمد محمد السعيد',
        schedule: {
            days: ['الأحد', 'الثلاثاء'],
            time: '08:00 - 09:30',
            room: 'قاعة 101'
        },
        prerequisites: [],
        maxStudents: 30,
        enrolledStudents: 15
    },
    {
        id: 'EPT102',
        name: 'كيمياء البيئة',
        code: 'EPT102',
        credits: 4,
        type: 'core',
        level: 1,
        description: 'دراسة التفاعلات الكيميائية في البيئة وتأثير الملوثات الكيميائية على النظم البيئية.',
        instructor: 'د. فاطمة عبدالله الزهراني',
        schedule: {
            days: ['الاثنين', 'الأربعاء'],
            time: '10:00 - 11:30',
            room: 'مختبر الكيمياء 201'
        },
        prerequisites: [],
        maxStudents: 25,
        enrolledStudents: 18
    },
    {
        id: 'EPT103',
        name: 'علوم الأرض والجيولوجيا البيئية',
        code: 'EPT103',
        credits: 3,
        type: 'core',
        level: 1,
        description: 'دراسة تركيب الأرض والعمليات الجيولوجية وتأثيرها على البيئة والموارد الطبيعية.',
        instructor: 'د. محمد علي القحطاني',
        schedule: {
            days: ['الأحد', 'الثلاثاء'],
            time: '13:00 - 14:30',
            room: 'قاعة 102'
        },
        prerequisites: [],
        maxStudents: 30,
        enrolledStudents: 12
    },
    {
        id: 'EPT104',
        name: 'الرياضيات التطبيقية',
        code: 'EPT104',
        credits: 3,
        type: 'general',
        level: 1,
        description: 'المفاهيم الرياضية الأساسية المطلوبة في مجال تكنولوجيا حماية البيئة والحسابات البيئية.',
        instructor: 'د. سارة أحمد المطيري',
        schedule: {
            days: ['الاثنين', 'الأربعاء'],
            time: '08:00 - 09:30',
            room: 'قاعة 103'
        },
        prerequisites: [],
        maxStudents: 35,
        enrolledStudents: 20
    },
    {
        id: 'EPT201',
        name: 'تقنيات معالجة المياه',
        code: 'EPT201',
        credits: 4,
        type: 'core',
        level: 2,
        description: 'دراسة تقنيات معالجة المياه الملوثة والمياه العادمة باستخدام الطرق الفيزيائية والكيميائية والبيولوجية.',
        instructor: 'د. خالد عبدالرحمن الغامدي',
        schedule: {
            days: ['الأحد', 'الثلاثاء'],
            time: '10:00 - 11:30',
            room: 'مختبر المياه 301'
        },
        prerequisites: ['EPT102'],
        maxStudents: 20,
        enrolledStudents: 8
    },
    {
        id: 'EPT202',
        name: 'مراقبة جودة الهواء',
        code: 'EPT202',
        credits: 3,
        type: 'core',
        level: 2,
        description: 'تقنيات قياس ومراقبة ملوثات الهواء والغازات المنبعثة من المصادر الصناعية والمرورية.',
        instructor: 'د. نورا سعد الحربي',
        schedule: {
            days: ['الاثنين', 'الأربعاء'],
            time: '13:00 - 14:30',
            room: 'مختبر الهواء 302'
        },
        prerequisites: ['EPT101'],
        maxStudents: 25,
        enrolledStudents: 10
    },
    {
        id: 'EPT203',
        name: 'إدارة النفايات الصلبة',
        code: 'EPT203',
        credits: 3,
        type: 'core',
        level: 2,
        description: 'طرق جمع ونقل ومعالجة والتخلص من النفايات الصلبة بطريقة آمنة وصديقة للبيئة.',
        instructor: 'د. عبدالعزيز محمد الشهري',
        schedule: {
            days: ['الأحد', 'الثلاثاء'],
            time: '15:00 - 16:30',
            room: 'قاعة 104'
        },
        prerequisites: ['EPT101'],
        maxStudents: 30,
        enrolledStudents: 14
    },
    {
        id: 'EPT301',
        name: 'التقييم البيئي والتأثير',
        code: 'EPT301',
        credits: 4,
        type: 'core',
        level: 3,
        description: 'منهجيات تقييم الأثر البيئي للمشاريع التنموية وإعداد دراسات التأثير البيئي.',
        instructor: 'د. ريم عبدالله العتيبي',
        schedule: {
            days: ['الاثنين', 'الأربعاء'],
            time: '10:00 - 11:30',
            room: 'قاعة 105'
        },
        prerequisites: ['EPT201', 'EPT202'],
        maxStudents: 25,
        enrolledStudents: 5
    },
    {
        id: 'EPT302',
        name: 'الطاقة المتجددة والاستدامة',
        code: 'EPT302',
        credits: 3,
        type: 'elective',
        level: 3,
        description: 'دراسة مصادر الطاقة المتجددة وتطبيقاتها في حماية البيئة وتحقيق التنمية المستدامة.',
        instructor: 'د. طارق سليمان الدوسري',
        schedule: {
            days: ['الأحد', 'الثلاثاء'],
            time: '11:30 - 13:00',
            room: 'قاعة 106'
        },
        prerequisites: ['EPT103'],
        maxStudents: 30,
        enrolledStudents: 8
    },
    {
        id: 'GEN101',
        name: 'اللغة الإنجليزية التخصصية',
        code: 'GEN101',
        credits: 2,
        type: 'general',
        level: 1,
        description: 'تطوير مهارات اللغة الإنجليزية في المجال التقني والبيئي مع التركيز على المصطلحات المتخصصة.',
        instructor: 'أ. جون سميث',
        schedule: {
            days: ['الخميس'],
            time: '08:00 - 10:00',
            room: 'قاعة اللغات 401'
        },
        prerequisites: [],
        maxStudents: 40,
        enrolledStudents: 25
    },
    {
        id: 'GEN102',
        name: 'مهارات الحاسوب',
        code: 'GEN102',
        credits: 2,
        type: 'general',
        level: 1,
        description: 'المهارات الأساسية في استخدام الحاسوب والبرامج المكتبية وتطبيقات البيئة الرقمية.',
        instructor: 'أ. سعد محمد الأحمدي',
        schedule: {
            days: ['الخميس'],
            time: '10:00 - 12:00',
            room: 'مختبر الحاسوب 501'
        },
        prerequisites: [],
        maxStudents: 30,
        enrolledStudents: 22
    },
    {
        id: 'EPT303',
        name: 'مشروع التخرج',
        code: 'EPT303',
        credits: 4,
        type: 'core',
        level: 3,
        description: 'مشروع تطبيقي في مجال تكنولوجيا حماية البيئة يتضمن البحث والتطوير والتطبيق العملي.',
        instructor: 'د. أحمد محمد السعيد',
        schedule: {
            days: ['الخميس'],
            time: '13:00 - 17:00',
            room: 'مختبر المشاريع 601'
        },
        prerequisites: ['EPT201', 'EPT202', 'EPT203'],
        maxStudents: 15,
        enrolledStudents: 3
    }
];

// Initialize courses page
function initializeCoursesPage() {
    checkPaymentStatus();
    loadRegisteredCourses();
    displayCourses();
    updateSummary();
}

// Check payment status
function checkPaymentStatus() {
    const receiptUploaded = localStorage.getItem('receiptUploaded');
    const paymentStatus = document.getElementById('paymentStatus');
    
    if (receiptUploaded === 'true') {
        paymentStatus.className = 'payment-status paid';
        paymentStatus.innerHTML = `
            <span class="status-icon">✅</span>
            <div>
                <strong>تم السداد:</strong> تم رفع إيصال السداد بنجاح. يمكنك الآن تسجيل المقررات.
            </div>
        `;
    }
}

// Load registered courses from localStorage
function loadRegisteredCourses() {
    const registered = localStorage.getItem('registeredCourses');
    if (registered) {
        window.registeredCourses = JSON.parse(registered);
    } else {
        window.registeredCourses = [];
    }
}

// Save registered courses to localStorage
function saveRegisteredCourses() {
    localStorage.setItem('registeredCourses', JSON.stringify(window.registeredCourses));
}

// Display courses
function displayCourses(filteredCourses = null) {
    const coursesList = document.getElementById('coursesList');
    const courses = filteredCourses || coursesData;
    
    coursesList.innerHTML = courses.map(course => {
        const isRegistered = window.registeredCourses.includes(course.id);
        const canRegister = canRegisterCourse(course);
        const paymentCompleted = localStorage.getItem('receiptUploaded') === 'true';
        
        return `
            <div class="course-card" data-type="${course.type}" data-level="${course.level}" data-credits="${course.credits}">
                <div class="course-header">
                    <div class="course-info">
                        <h3>${course.name}</h3>
                        <div class="course-code">${course.code}</div>
                    </div>
                    <div class="course-credits">${course.credits} ساعات</div>
                </div>
                <div class="course-details">
                    <div class="course-meta">
                        <div class="meta-item">
                            <span class="meta-icon">👨‍🏫</span>
                            <span>${course.instructor}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-icon">📅</span>
                            <span>${course.schedule.days.join(', ')}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-icon">🕐</span>
                            <span>${course.schedule.time}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-icon">🏛️</span>
                            <span>${course.schedule.room}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-icon">👥</span>
                            <span>${course.enrolledStudents}/${course.maxStudents} طالب</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-icon">📊</span>
                            <span>المستوى ${course.level}</span>
                        </div>
                    </div>
                    <div class="course-description">
                        ${course.description}
                    </div>
                    ${course.prerequisites.length > 0 ? `
                        <div class="prerequisites">
                            <strong>المتطلبات السابقة:</strong> ${course.prerequisites.join(', ')}
                        </div>
                    ` : ''}
                    <div class="course-actions">
                        ${isRegistered ? 
                            `<button class="registered-btn">✅ مسجل</button>
                             <button class="register-btn" onclick="unregisterCourse('${course.id}')" style="background: #f44336;">إلغاء التسجيل</button>` :
                            `<button class="register-btn" 
                                onclick="registerCourse('${course.id}')" 
                                ${!canRegister || !paymentCompleted ? 'disabled' : ''}>
                                ${!paymentCompleted ? 'يتطلب السداد أولاً' : 
                                  !canRegister ? 'لا يمكن التسجيل' : 'تسجيل'}
                            </button>`
                        }
                        ${!canRegister && paymentCompleted ? 
                            `<small style="color: #f44336;">
                                ${getRegistrationBlockReason(course)}
                            </small>` : ''
                        }
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Check if course can be registered
function canRegisterCourse(course) {
    // Check if already registered
    if (window.registeredCourses.includes(course.id)) {
        return false;
    }
    
    // Check credit limit
    const currentCredits = getCurrentCredits();
    if (currentCredits + course.credits > 18) {
        return false;
    }
    
    // Check prerequisites
    for (let prereq of course.prerequisites) {
        if (!window.registeredCourses.includes(prereq)) {
            return false;
        }
    }
    
    // Check if course is full
    if (course.enrolledStudents >= course.maxStudents) {
        return false;
    }
    
    // Check for time conflicts
    if (hasTimeConflict(course)) {
        return false;
    }
    
    return true;
}

// Get reason why registration is blocked
function getRegistrationBlockReason(course) {
    if (window.registeredCourses.includes(course.id)) {
        return 'مسجل مسبقاً';
    }
    
    const currentCredits = getCurrentCredits();
    if (currentCredits + course.credits > 18) {
        return 'تجاوز الحد الأقصى للساعات';
    }
    
    for (let prereq of course.prerequisites) {
        if (!window.registeredCourses.includes(prereq)) {
            return `يتطلب إنهاء ${prereq} أولاً`;
        }
    }
    
    if (course.enrolledStudents >= course.maxStudents) {
        return 'المقرر مكتمل';
    }
    
    if (hasTimeConflict(course)) {
        return 'تعارض في الوقت';
    }
    
    return '';
}

// Check for time conflicts
function hasTimeConflict(newCourse) {
    const registeredCourses = window.registeredCourses.map(id => 
        coursesData.find(c => c.id === id)
    ).filter(c => c);
    
    for (let registeredCourse of registeredCourses) {
        // Check if any day overlaps
        const hasCommonDay = newCourse.schedule.days.some(day => 
            registeredCourse.schedule.days.includes(day)
        );
        
        if (hasCommonDay) {
            // Check if times overlap
            const newStart = timeToMinutes(newCourse.schedule.time.split(' - ')[0]);
            const newEnd = timeToMinutes(newCourse.schedule.time.split(' - ')[1]);
            const regStart = timeToMinutes(registeredCourse.schedule.time.split(' - ')[0]);
            const regEnd = timeToMinutes(registeredCourse.schedule.time.split(' - ')[1]);
            
            if ((newStart < regEnd && newEnd > regStart)) {
                return true;
            }
        }
    }
    
    return false;
}

// Convert time to minutes for comparison
function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

// Get current total credits
function getCurrentCredits() {
    return window.registeredCourses.reduce((total, courseId) => {
        const course = coursesData.find(c => c.id === courseId);
        return total + (course ? course.credits : 0);
    }, 0);
}

// Register for a course
function registerCourse(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;
    
    if (!canRegisterCourse(course)) {
        showMessage('لا يمكن التسجيل في هذا المقرر', 'error');
        return;
    }
    
    window.registeredCourses.push(courseId);
    saveRegisteredCourses();
    
    // Update enrolled students count
    course.enrolledStudents++;
    
    showMessage(`تم التسجيل في مقرر ${course.name} بنجاح`, 'success');
    displayCourses();
    updateSummary();
}

// Unregister from a course
function unregisterCourse(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;
    
    const index = window.registeredCourses.indexOf(courseId);
    if (index > -1) {
        window.registeredCourses.splice(index, 1);
        saveRegisteredCourses();
        
        // Update enrolled students count
        course.enrolledStudents--;
        
        showMessage(`تم إلغاء التسجيل من مقرر ${course.name}`, 'info');
        displayCourses();
        updateSummary();
    }
}

// Update summary statistics
function updateSummary() {
    const registeredCount = window.registeredCourses.length;
    const totalCredits = getCurrentCredits();
    const maxCredits = 18;
    const remainingCredits = maxCredits - totalCredits;
    
    document.getElementById('registeredCount').textContent = registeredCount;
    document.getElementById('totalCredits').textContent = totalCredits;
    document.getElementById('remainingCredits').textContent = remainingCredits;
}

// Apply filters
function applyFilters() {
    const typeFilter = document.getElementById('courseTypeFilter').value;
    const levelFilter = document.getElementById('levelFilter').value;
    const creditsFilter = document.getElementById('creditsFilter').value;
    
    let filteredCourses = coursesData;
    
    if (typeFilter) {
        filteredCourses = filteredCourses.filter(course => course.type === typeFilter);
    }
    
    if (levelFilter) {
        filteredCourses = filteredCourses.filter(course => course.level === parseInt(levelFilter));
    }
    
    if (creditsFilter) {
        filteredCourses = filteredCourses.filter(course => course.credits === parseInt(creditsFilter));
    }
    
    displayCourses(filteredCourses);
}

// Navigation functions
function goToCourses() {
    window.location.href = 'courses.html';
}

function goToSchedule() {
    window.location.href = 'schedule.html';
}

function goToStudentCard() {
    window.location.href = 'student-card.html';
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('courses.html')) {
        initializeCoursesPage();
    }
});


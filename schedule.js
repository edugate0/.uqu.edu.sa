// Schedule management functions

// Time slots for the schedule
const timeSlots = [
    '08:00 - 09:30',
    '10:00 - 11:30',
    '11:30 - 13:00',
    '13:00 - 14:30',
    '15:00 - 16:30'
];

// Days of the week
const daysOfWeek = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

// Course colors for visual distinction
const courseColors = [
    '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336', 
    '#00BCD4', '#795548', '#607D8B', '#E91E63', '#3F51B5'
];

// Initialize schedule page
function initializeSchedulePage() {
    loadRegisteredCourses();
    generateScheduleGrid();
    displayRegisteredCourses();
    updateScheduleStats();
}

// Generate the schedule grid
function generateScheduleGrid() {
    const scheduleGrid = document.getElementById('scheduleGrid');
    if (!scheduleGrid) return;
    
    let gridHTML = '';
    
    // Header row
    gridHTML += '<div class="time-slot">الوقت</div>';
    daysOfWeek.forEach(day => {
        gridHTML += `<div class="day-header">${day}</div>`;
    });
    
    // Time slot rows
    timeSlots.forEach(timeSlot => {
        gridHTML += `<div class="time-slot">${timeSlot}</div>`;
        
        daysOfWeek.forEach(day => {
            const course = findCourseAtTime(day, timeSlot);
            if (course) {
                const colorIndex = window.registeredCourses.indexOf(course.id) % courseColors.length;
                gridHTML += `
                    <div class="schedule-cell occupied" 
                         style="border-color: ${courseColors[colorIndex]}; background: linear-gradient(135deg, ${courseColors[colorIndex]}20, ${courseColors[colorIndex]}40);"
                         onclick="showCourseDetails('${course.id}')"
                         title="${course.name}">
                        <div class="course-code">${course.code}</div>
                        <div class="course-name">${course.name.length > 20 ? course.name.substring(0, 20) + '...' : course.name}</div>
                        <div class="course-room">${course.schedule.room}</div>
                    </div>
                `;
            } else {
                gridHTML += '<div class="schedule-cell"></div>';
            }
        });
    });
    
    scheduleGrid.innerHTML = gridHTML;
}

// Find course at specific day and time
function findCourseAtTime(day, timeSlot) {
    if (!window.registeredCourses || !coursesData) return null;
    
    const registeredCourseObjects = window.registeredCourses.map(id => 
        coursesData.find(c => c.id === id)
    ).filter(c => c);
    
    return registeredCourseObjects.find(course => 
        course.schedule.days.includes(day) && course.schedule.time === timeSlot
    );
}

// Display registered courses list
function displayRegisteredCourses() {
    const coursesList = document.getElementById('coursesList');
    if (!coursesList) return;
    
    if (!window.registeredCourses || window.registeredCourses.length === 0) {
        coursesList.innerHTML = `
            <div class="empty-schedule">
                <div class="empty-icon">📚</div>
                <h3>لا توجد مقررات مسجلة</h3>
                <p>لم تقم بتسجيل أي مقررات بعد. انتقل إلى صفحة تسجيل المقررات لبدء التسجيل.</p>
                <a href="courses.html" class="action-btn" style="margin-top: 15px;">
                    <span>📝</span>
                    تسجيل المقررات
                </a>
            </div>
        `;
        return;
    }
    
    const registeredCourseObjects = window.registeredCourses.map(id => 
        coursesData.find(c => c.id === id)
    ).filter(c => c);
    
    coursesList.innerHTML = registeredCourseObjects.map((course, index) => {
        const colorIndex = index % courseColors.length;
        return `
            <div class="course-item" onclick="showCourseDetails('${course.id}')">
                <div class="course-color" style="background: ${courseColors[colorIndex]};"></div>
                <div class="course-details">
                    <div class="course-title">${course.name} (${course.code})</div>
                    <div class="course-meta">
                        <span>👨‍🏫 ${course.instructor}</span>
                        <span>📅 ${course.schedule.days.join(', ')}</span>
                        <span>🕐 ${course.schedule.time}</span>
                        <span>🏛️ ${course.schedule.room}</span>
                        <span>📊 ${course.credits} ساعات</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Update schedule statistics
function updateScheduleStats() {
    if (!window.registeredCourses) return;
    
    const totalCourses = window.registeredCourses.length;
    const totalCredits = window.registeredCourses.reduce((total, courseId) => {
        const course = coursesData.find(c => c.id === courseId);
        return total + (course ? course.credits : 0);
    }, 0);
    
    // Calculate weekly hours (assuming each credit = 1 hour per week)
    const weeklyHours = totalCredits;
    
    document.getElementById('totalCourses').textContent = totalCourses;
    document.getElementById('totalCredits').textContent = totalCredits;
    document.getElementById('weeklyHours').textContent = weeklyHours;
}

// Show course details in a modal or alert
function showCourseDetails(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;
    
    const details = `
المقرر: ${course.name}
الرمز: ${course.code}
المدرس: ${course.instructor}
الساعات: ${course.credits}
الأيام: ${course.schedule.days.join(', ')}
الوقت: ${course.schedule.time}
القاعة: ${course.schedule.room}
الوصف: ${course.description}
    `;
    
    alert(details);
}

// Print schedule
function printSchedule() {
    // Create a print-friendly version
    const printWindow = window.open('', '_blank');
    const scheduleHTML = generatePrintableSchedule();
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <title>الجدول الدراسي - جامعة أم القرى</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; direction: rtl; }
                .header { text-align: center; margin-bottom: 30px; }
                .schedule-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                .schedule-table th, .schedule-table td { 
                    border: 1px solid #333; 
                    padding: 8px; 
                    text-align: center; 
                    font-size: 12px;
                }
                .schedule-table th { background: #f0f0f0; font-weight: bold; }
                .occupied { background: #e8f5e8; }
                .courses-list { margin-top: 30px; }
                .course-item { margin-bottom: 10px; padding: 10px; border: 1px solid #ddd; }
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            ${scheduleHTML}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

// Generate printable schedule HTML
function generatePrintableSchedule() {
    const studentData = JSON.parse(localStorage.getItem('studentData') || '{}');
    
    let html = `
        <div class="header">
            <h1>جامعة أم القرى</h1>
            <h2>الجدول الدراسي</h2>
            <p>الطالب: ${studentData.name || 'غير محدد'}</p>
            <p>الرقم الجامعي: ${studentData.nationalId || 'غير محدد'}</p>
            <p>التخصص: ${studentData.major || 'غير محدد'}</p>
            <p>الفصل الدراسي: الأول 1447هـ</p>
        </div>
        
        <table class="schedule-table">
            <thead>
                <tr>
                    <th>الوقت</th>
                    ${daysOfWeek.map(day => `<th>${day}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
    `;
    
    timeSlots.forEach(timeSlot => {
        html += `<tr><td><strong>${timeSlot}</strong></td>`;
        
        daysOfWeek.forEach(day => {
            const course = findCourseAtTime(day, timeSlot);
            if (course) {
                html += `<td class="occupied">${course.code}<br>${course.schedule.room}</td>`;
            } else {
                html += '<td></td>';
            }
        });
        
        html += '</tr>';
    });
    
    html += `
            </tbody>
        </table>
        
        <div class="courses-list">
            <h3>المقررات المسجلة:</h3>
    `;
    
    if (window.registeredCourses && window.registeredCourses.length > 0) {
        const registeredCourseObjects = window.registeredCourses.map(id => 
            coursesData.find(c => c.id === id)
        ).filter(c => c);
        
        registeredCourseObjects.forEach(course => {
            html += `
                <div class="course-item">
                    <strong>${course.name} (${course.code})</strong><br>
                    المدرس: ${course.instructor}<br>
                    الساعات: ${course.credits} | الأيام: ${course.schedule.days.join(', ')} | الوقت: ${course.schedule.time}<br>
                    القاعة: ${course.schedule.room}
                </div>
            `;
        });
    } else {
        html += '<p>لا توجد مقررات مسجلة</p>';
    }
    
    html += '</div>';
    
    return html;
}

// Export schedule as PDF (simplified version)
function exportSchedule() {
    showMessage('سيتم تطوير ميزة تصدير PDF قريباً', 'info');
    // In a real implementation, you would use a library like jsPDF
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('schedule.html')) {
        initializeSchedulePage();
    }
});


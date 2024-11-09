document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar-container');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'en',
        events: [
            { title: 'Sophia - Appointment', date: '2024-11-15', description: 'Confirmed' },
            { title: 'John\'s Appointment', date: '2024-11-17', description: 'Canceled' },
            { title: 'Blood Pressure Check', date: '2024-11-20' },
            { title: 'Diabetes Follow-up', date: '2024-11-25' }
        ],
        eventClick: function(info) {
            alert('Event: ' + info.event.title + '\nDate: ' + info.event.start.toLocaleString());
        }
    });
    calendar.render();

    const todaysAppointment = document.getElementById('todays-appointment');
    todaysAppointment.innerHTML = `
        <p><strong>Sophia</strong> - 2024-11-15, 10:00 AM</p>
        <p>Status: <span class="text-green-500">Confirmed</span></p>
    `;

    const appointmentsList = document.getElementById('appointments-list');
    appointmentsList.innerHTML = `
        <p><strong>John</strong> - 2024-11-17, 2:00 PM - <span class="text-red-500">Canceled</span></p>
        <p><strong>Blood Pressure Check</strong> - 2024-11-20, 10:30 AM</p>
        <p><strong>Diabetes Follow-up</strong> - 2024-11-25, 1:00 PM</p>
    `;

    document.getElementById('add-appointment-btn').addEventListener('click', function() {
        const modalHtml = `
            <div id="appointment-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                <div class="bg-white p-6 rounded-md w-96">
                    <h3 class="text-xl font-semibold mb-4">Add Appointment</h3>
                    <form id="appointment-form">
                        <table class="w-full">
                            <tr>
                                <td><label for="patient-name" class="block text-sm font-medium">Patient's Name</label></td>
                                <td><input type="text" id="patient-name" class="border p-2 mt-1 w-full" required></td>
                            </tr>
                            <tr>
                                <td><label for="appointment-date" class="block text-sm font-medium">Date (YYYY-MM-DD)</label></td>
                                <td><input type="date" id="appointment-date" class="border p-2 mt-1 w-full" required></td>
                            </tr>
                            <tr>
                                <td><label for="appointment-time" class="block text-sm font-medium">Time (HH:MM)</label></td>
                                <td><input type="time" id="appointment-time" class="border p-2 mt-1 w-full" required></td>
                            </tr>
                        </table>
                        <div class="mt-4 flex justify-between">
                            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Add Appointment</button>
                            <button type="button" id="close-modal" class="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        document.getElementById('appointment-form').addEventListener('submit', function(event) {
            event.preventDefault();
            const patientName = document.getElementById('patient-name').value;
            const appointmentDate = document.getElementById('appointment-date').value;
            const appointmentTime = document.getElementById('appointment-time').value;

            if (patientName && appointmentDate && appointmentTime) {
                const appointmentDatetime = `${appointmentDate}T${appointmentTime}:00`;

                calendar.addEvent({
                    title: `Appointment with ${patientName}`,
                    start: appointmentDatetime,
                    description: 'New Appointment'
                });

                addToUpcomingAppointments(patientName, appointmentDate, appointmentTime);

                document.getElementById('appointment-modal').remove();
                document.getElementById('appointment-form').reset();
            } else {
                alert("Please fill in all fields.");
            }
        });

        document.getElementById('close-modal').addEventListener('click', function() {
            document.getElementById('appointment-modal').remove();
        });
    });

    function addToUpcomingAppointments(patientName, appointmentDate, appointmentTime) {
        const appointmentsList = document.getElementById('appointments-list');
        const newAppointment = document.createElement('p');
        newAppointment.innerHTML = `<strong>${patientName}</strong> - ${appointmentDate} at ${appointmentTime}`;
        appointmentsList.appendChild(newAppointment);
    }

    function toggleDropdown(menuId, arrowId) {
        const menu = document.getElementById(menuId);
        const arrow = document.getElementById(arrowId);
        const parentLi = menu.parentElement;

        parentLi.classList.toggle('open');

        if (parentLi.classList.contains('open')) {
            arrow.innerHTML = '▲';
        } else {
            arrow.innerHTML = '▼';
        }
    }

    const toggleButton = document.getElementById("toggle-btn");
    const sidebar = document.getElementById("sidebar");
    const closeButton = document.getElementById("close-btn");

    toggleButton.addEventListener("click", () => {
        sidebar.classList.toggle("-translate-x-full");
        toggleButton.classList.toggle("hidden");
    });

    closeButton.addEventListener("click", () => {
        sidebar.classList.add("-translate-x-full");
        toggleButton.classList.remove("hidden");
    });
});

function toggleDropdown(menuId, arrowId) {
    const menu = document.getElementById(menuId);
    const arrow = document.getElementById(arrowId);

    menu.classList.toggle('hidden');
    menu.classList.toggle('opacity-0');
    menu.classList.toggle('opacity-100');
    menu.classList.toggle('transition-opacity');

    if (menu.classList.contains('hidden')) {
        arrow.textContent = '▼';
    } else {
        arrow.textContent = '▲';
    }
}

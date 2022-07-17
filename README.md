## API Endpoints

---

### Appointments

#### API endpoint: /appointments

method: GET  
Returns list of all created appointments

#### API endpoint: /users/{userId}?id={doctorId}

method: PATCH  
Creates an appointment between user and doctor  
Appointment date generates randomly between 2 minutes and 24 hours past current time

#### API endpoint: /doctors/{doctorId}?id={appointmentId}

request body: { "appointments": {"active": Boolean}}  
method: PATCH  
Doctor approves or declines appointment by id

#### API endpoint: /appointments/{appointmentId}

method: DELETE  
Deletes appointment by id from appointments collection, arrays of accepted appointments of user and
doctor are not involved

---

### Registration

#### API endpoint: /register

request body: { "name": String, "email": String, "phone": String, "type": "user" | "doc" }  
method: POST  
Registers new user as "user" or "doctor" based on "type" value

---

### Doctors

#### API endpoint: /doctors

method: GET  
Returns list of all doctors in collection

#### API endpoint: /doctors/{doctorId}

method: DELETE  
Deletes a doctor from collection by id

---

### Users

#### API endpoint: /users

method: GET  
Returns list of all users in collection

#### API endpoint: /doctors/{doctorId}

method: DELETE  
Deletes a user from collection by id

---

## Services

---

### Updating appointment list

If appointment time < current time, it is being deactivated  
It also gets deleted from doctor's "accepted_appointments" array

---

### User notification

#### One day before an appointment

Logs a message into a new file in `logs` folder  
Filename template: date_time_username.log

#### Two hours before an appointment

Logs a message into a new file in `logs` folder  
Filename template: date_time_username.log

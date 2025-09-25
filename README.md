# MovieTickets 🎬

A modern web application for booking movie tickets with a clean, responsive user interface. Built with Spring Boot and featuring real-time form validation, CRUD operations, and an intuitive booking system.

![MovieTickets Preview](https://img.shields.io/badge/Spring%20Boot-2.7.18-green) ![Java](https://img.shields.io/badge/Java-11-orange) ![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- **🎫 Movie Ticket Booking**: Easy-to-use interface for booking cinema tickets
- **📱 Responsive Design**: Modern, mobile-friendly UI with gradient backgrounds and glassmorphism effects
- **✅ Real-time Validation**: Client-side form validation with visual feedback
- **🗄️ CRUD Operations**: Create, read, update, and delete bookings
- **📊 Statistics Dashboard**: Live statistics showing total bookings, tickets, and available movies
- **🔍 Smart Sorting**: Automatic sorting by last name for better organization
- **🎨 Modern UI/UX**: Clean design with hover effects, animations, and intuitive navigation
- **💾 Persistent Storage**: H2 in-memory database for reliable data storage

## 🛠️ Tech Stack

### Backend
- **Spring Boot 2.7.18** - Java web framework
- **Spring Web** - REST API endpoints
- **Spring JDBC** - Database connectivity
- **H2 Database** - In-memory database for development
- **Maven** - Dependency management and build tool

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Interactive functionality
- **jQuery** - DOM manipulation and AJAX requests
- **Bootstrap 5** - Responsive grid system and components
- **Font Awesome** - Icon library

## 🚀 Getting Started

### Prerequisites

- **Java 11** or higher
- **Maven 3.6+**
- **Git** (for cloning the repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/olavhjemsaeter/MovieTickets.git
   cd MovieTickets
   ```

2. **Run the application**
   ```bash
   ./mvnw spring-boot:run
   ```

3. **Access the application**
   - Open your browser and navigate to `http://localhost:8080`
   - The application will start with an empty booking list

### Alternative: Using Maven Wrapper (Windows)
```bash
mvnw.cmd spring-boot:run
```

## 📖 Usage

### Making a Booking

1. **Select a Movie**: Choose from available movies (Ocean's Eleven, Ocean's Twelve, Ocean's Thirteen)
2. **Enter Details**: Fill in the number of tickets, your name, phone number, and email
3. **Submit**: Click "Registrer Bestilling" to create your booking
4. **View**: Your booking will appear in the "Alle Bestillinger" table

### Managing Bookings

- **View All**: See all bookings in the organized table
- **Edit**: Click the edit button (✏️) to modify a booking
- **Delete**: Click the delete button (🗑️) to remove a booking
- **Delete All**: Use "Slett Alle Billetter" to clear all bookings

### Features Overview

- **Real-time Validation**: Forms validate input as you type
- **Statistics**: View total bookings, tickets sold, and available movies
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Auto-sorting**: Bookings are automatically sorted by last name

## 🏗️ Project Structure

```
MovieTickets/
├── src/
│   ├── main/
│   │   ├── java/com/example/oblig3/
│   │   │   ├── Oblig3Application.java      # Main Spring Boot application
│   │   │   ├── Bestilling.java             # Booking entity/model
│   │   │   ├── BestillingController.java   # REST API controller
│   │   │   └── BestillingRepository.java   # Data access layer
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── index.html              # Main booking interface
│   │       │   ├── index.js                # Frontend JavaScript logic
│   │       │   ├── endre.html              # Edit booking page
│   │       │   └── endre.js                # Edit page JavaScript
│   │       └── application.properties      # Spring configuration
│   └── test/                               # Test files
├── pom.xml                                 # Maven configuration
└── README.md                               # This file
```

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/hentAlle` | Retrieve all bookings |
| POST | `/lagre` | Create a new booking |
| GET | `/slettEnBestilling?id={id}` | Delete a specific booking |
| GET | `/slettAlle` | Delete all bookings |

## 🎨 UI Features

### Design Elements
- **Gradient Backgrounds**: Modern purple-to-blue gradients
- **Glassmorphism Cards**: Semi-transparent cards with backdrop blur
- **Smooth Animations**: Hover effects and transitions
- **Responsive Grid**: Adapts to different screen sizes
- **Color-coded Badges**: Visual distinction for different data types

### User Experience
- **Intuitive Forms**: Clear labels and helpful validation messages
- **Visual Feedback**: Loading states and success/error notifications
- **Keyboard Navigation**: Full keyboard accessibility
- **Mobile Optimized**: Touch-friendly interface for mobile devices

## 🧪 Validation Rules

### Form Validation
- **Movie Selection**: Required field
- **Number of Tickets**: Between 1-10 tickets
- **Name Fields**: Letters, spaces, and hyphens only
- **Phone Number**: Exactly 8 digits
- **Email**: Valid email format

### Client-side Validation
- Real-time validation as you type
- Visual indicators (green/red borders)
- Helpful error messages
- Prevents invalid submissions

## 🗄️ Database Schema

The application uses an H2 in-memory database with the following structure:

```sql
CREATE TABLE bestilling (
    id INT PRIMARY KEY AUTO_INCREMENT,
    movie VARCHAR(255),
    numTickets INT,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    phoneNumber INT,
    email VARCHAR(255)
);
```

## 🚀 Deployment

### Local Development
```bash
./mvnw spring-boot:run
```

### Building for Production
```bash
./mvnw clean package
java -jar target/Oblig3-0.0.1-SNAPSHOT.jar
```

### Docker (Optional)
```dockerfile
FROM openjdk:11-jre-slim
COPY target/Oblig3-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Olav Hjemsæter**
- GitHub: [@olavhjemsaeter](https://github.com/olavhjemsaeter)
- LinkedIn: [Olav Hjemsæter](https://linkedin.com/in/olavhjemsaeter)

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- Bootstrap team for the responsive CSS framework
- Font Awesome for the beautiful icons
- The open-source community for inspiration and tools

---

⭐ **Star this repository if you found it helpful!**
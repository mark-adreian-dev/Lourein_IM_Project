-- Create the database
CREATE DATABASE im_project_abanales;
USE im_project_abanales;

-- Create the Department table
CREATE TABLE Department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) DEFAULT NULL
);

-- Create the Employee table with a foreign key to Department
CREATE TABLE Employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES Department(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- Create the Account table
CREATE TABLE Account (
    acc_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    employee_id INT NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES Employee(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- Create the Project table
CREATE TABLE Project (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    start_date DATE DEFAULT NULL,
    end_date DATE DEFAULT NULL
);

-- Create the Task table with a foreign key to Project
CREATE TABLE Task (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT DEFAULT NULL,
    status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
    project_id INT,
    FOREIGN KEY (project_id) REFERENCES Project(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- Insert data into Department
INSERT INTO Department (name, location)
VALUES 
    ('Human Resources', 'New York'),
    ('Finance', 'London'),
    ('IT', 'San Francisco'),
    ('Marketing', 'Sydney'),
    ('Operations', 'Tokyo'),
    ('Sales', 'Berlin'),
    ('R&D', 'Boston'),
    ('Customer Support', 'Toronto'),
    ('Logistics', 'Dubai'),
    ('Admin', 'Singapore'),
    ('Procurement', 'Seoul'),
    ('Legal', 'Paris'),
    ('Engineering', 'Detroit'),
    ('Quality Assurance', 'Houston'),
    ('Training', 'Mumbai'),
    ('Public Relations', 'Barcelona'),
    ('Security', 'Hong Kong'),
    ('Analytics', 'Chicago'),
    ('Compliance', 'Rome'),
    ('Planning', 'Melbourne');

-- Insert data into Employee
INSERT INTO Employee (first_name, last_name, email, department_id)
VALUES 
    ('John', 'Doe', 'john.doe@example.com', 1),
    ('Jane', 'Smith', 'jane.smith@example.com', 2),
    ('Alice', 'Johnson', 'alice.johnson@example.com', 3),
    ('Bob', 'Brown', 'bob.brown@example.com', 4),
    ('Charlie', 'Davis', 'charlie.davis@example.com', 5),
    ('Diana', 'Miller', 'diana.miller@example.com', 6),
    ('Eve', 'Wilson', 'eve.wilson@example.com', 7),
    ('Frank', 'Moore', 'frank.moore@example.com', 8),
    ('Grace', 'Taylor', 'grace.taylor@example.com', 9),
    ('Hank', 'Anderson', 'hank.anderson@example.com', 10),
    ('Ivy', 'Thomas', 'ivy.thomas@example.com', 11),
    ('Jack', 'Jackson', 'jack.jackson@example.com', 12),
    ('Karen', 'White', 'karen.white@example.com', 13),
    ('Leo', 'Harris', 'leo.harris@example.com', 14),
    ('Maria', 'Clark', 'maria.clark@example.com', 15),
    ('Nina', 'Lewis', 'nina.lewis@example.com', 16),
    ('Oscar', 'Hall', 'oscar.hall@example.com', 17),
    ('Paul', 'Allen', 'paul.allen@example.com', 18),
    ('Quinn', 'Young', 'quinn.young@example.com', 19),
    ('Rita', 'King', 'rita.king@example.com', 20);

-- Insert data into Project
INSERT INTO Project (name, start_date, end_date)
VALUES 
    ('Project Alpha', '2024-01-01', '2024-06-30'),
    ('Project Beta', '2024-02-01', '2024-07-31'),
    ('Project Gamma', '2024-03-01', '2024-08-31'),
    ('Project Delta', '2024-04-01', '2024-09-30'),
    ('Project Epsilon', '2024-05-01', '2024-10-31'),
    ('Project Zeta', '2024-06-01', '2024-11-30'),
    ('Project Eta', '2024-07-01', '2024-12-31'),
    ('Project Theta', '2024-08-01', '2025-01-31'),
    ('Project Iota', '2024-09-01', '2025-02-28'),
    ('Project Kappa', '2024-10-01', '2025-03-31'),
    ('Project Lambda', '2024-11-01', '2025-04-30'),
    ('Project Mu', '2024-12-01', '2025-05-31'),
    ('Project Nu', '2025-01-01', '2025-06-30'),
    ('Project Xi', '2025-02-01', '2025-07-31'),
    ('Project Omicron', '2025-03-01', '2025-08-31'),
    ('Project Pi', '2025-04-01', '2025-09-30'),
    ('Project Rho', '2025-05-01', '2025-10-31'),
    ('Project Sigma', '2025-06-01', '2025-11-30'),
    ('Project Tau', '2025-07-01', '2025-12-31'),
    ('Project Upsilon', '2025-08-01', '2026-01-31');

-- Insert data into Task
INSERT INTO Task (title, description, status, project_id)
VALUES 
    ('Task 1', 'Description for Task 1', 'Pending', 1),
    ('Task 2', 'Description for Task 2', 'In Progress', 1),
    ('Task 3', 'Description for Task 3', 'Completed', 2),
    ('Task 4', 'Description for Task 4', 'Pending', 2),
    ('Task 5', 'Description for Task 5', 'In Progress', 3),
    ('Task 6', 'Description for Task 6', 'Completed', 3),
    ('Task 7', 'Description for Task 7', 'Pending', 4),
    ('Task 8', 'Description for Task 8', 'In Progress', 4),
    ('Task 9', 'Description for Task 9', 'Completed', 5),
    ('Task 10', 'Description for Task 10', 'Pending', 5),
    ('Task 11', 'Description for Task 11', 'In Progress', 6),
    ('Task 12', 'Description for Task 12', 'Completed', 6),
    ('Task 13', 'Description for Task 13', 'Pending', 7),
    ('Task 14', 'Description for Task 14', 'In Progress', 7),
    ('Task 15', 'Description for Task 15', 'Completed', 8),
    ('Task 16', 'Description for Task 16', 'Pending', 8),
    ('Task 17', 'Description for Task 17', 'In Progress', 9),
    ('Task 18', 'Description for Task 18', 'Completed', 9),
    ('Task 19', 'Description for Task 19', 'Pending', 10),
    ('Task 20', 'Description for Task 20', 'In Progress', 10);


-- Insert data into Account for each Employee
INSERT INTO Account (username, password, employee_id)
VALUES
    ('johndoe', 'password123', 1),
    ('janesmith', 'password123', 2),
    ('alicejohnson', 'password123', 3),
    ('bobbrown', 'password123', 4),
    ('charliedavis', 'password123', 5),
    ('dianamiller', 'password123', 6),
    ('evewilson', 'password123', 7),
    ('frankmoore', 'password123', 8),
    ('gracetaylor', 'password123', 9),
    ('hankanderson', 'password123', 10),
    ('ivythomas', 'password123', 11),
    ('jackjackson', 'password123', 12),
    ('karenwhite', 'password123', 13),
    ('leoharris', 'password123', 14),
    ('mariaclark', 'password123', 15),
    ('ninalewis', 'password123', 16),
    ('oscarhall', 'password123', 17),
    ('paulallen', 'password123', 18),
    ('quinnyoung', 'password123', 19),
    ('ritaking', 'password123', 20);
CREATE TABLE IF NOT EXISTS UserProjects (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,
    project_id BIGINT,
    created_by BIGINT,
    updated_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (project_id) REFERENCES Projects(id)
);




CREATE TABLE IF NOT EXISTS Projects (
    id BIGINT PRIMARY KEY,
    project_code VARCHAR(255) UNIQUE,
    project_name VARCHAR(255),
    created_by BIGINT,
    updated_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    project_status VARCHAR(50),
    project_start_date DATE,
    FOREIGN KEY (created_by) REFERENCES Users(id),
    FOREIGN KEY (updated_by) REFERENCES Users(id)
);



CREATE TABLE IF NOT EXISTS UserRoles (
    userId BIGINT,
    roleId BIGINT,
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (roleId) REFERENCES Role(id),
    PRIMARY KEY (userId, roleId)
);

CREATE TABLE IF NOT EXISTS Role (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255)
);

ALTER TABLE Users
ADD COLUMN created_by BIGINT,
ADD COLUMN updated_by BIGINT,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN status VARCHAR(50),
ADD COLUMN user_group VARCHAR(50);



CREATE TABLE IF NOT EXISTS Users (
    id BIGINT PRIMARY KEY,
    emp_id VARCHAR(255) UNIQUE,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    phone VARCHAR(20)
);

INSERT INTO Role (id, name) VALUES
(1, 'ROLE_ADMIN'),
(2, 'ROLE_USER');

INSERT INTO Users (id, firstName, lastName, email, password, phone)
VALUES
(1, 'alif', 'lodi', 'aliflodi@gmail.com', 'password', '01718521795');


INSERT INTO UserRoles (userId, roleId) VALUES
(1, 1); 



CREATE TABLE IF NOT EXISTS User(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL,
    UserType enum("admin","student")
)Engine = InnoDB;

CREATE TABLE IF NOT EXISTS Student(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    sid INT NOT NULL,
    name VARCHAR(255),
    dateOfBirth DATE,
    joiningDate DATE,
    phNumber VARCHAR(15),
    email VARCHAR(50),
    address VARCHAR(255),
    city VARCHAR(255),
    areacode VARCHAR(10),
    userId INT,
    FOREIGN KEY (userId) REFERENCES User(id)
)Engine = InnoDB;

CREATE TABLE IF NOT EXISTS Parent(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    phNumber VARCHAR(15),
    emailId VARCHAR(50)
)Engine= InnoDB;

CREATE TABLE IF NOT EXISTS Student_Parent(
    studentId INT,
    parentId INT,
    parentRelation enum("mother","father"),
    FOREIGN KEY (studentId) REFERENCES Student(id),
    FOREIGN KEY (parentId) REFERENCES Parent(id)
)Engine=InnoDB;

CREATE TABLE IF NOT EXISTS Finance(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    amount double(10,2),
    paidOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paidBy INT,
    FOREIGN KEY (paidBy) REFERENCES Student(id)   
)Engine=InnoDB;
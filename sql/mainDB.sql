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
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)Engine = InnoDB;

CREATE TABLE IF NOT EXISTS Parent(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40),
    parentOfStudentId INT,
    parentRelation enum("mother","father"),
    phNumber VARCHAR(15),
    emailId VARCHAR(50),
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parentOfStudentId) REFERENCES Student(id)
)Engine= InnoDB;

CREATE TABLE IF NOT EXISTS FeeType(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40)
)Engine=InnoDB;

CREATE TABLE IF NOT EXISTS Finance(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    amount double(10,2),
    paidOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paidBy INT,
    paidBySID INT,
    financeType VARCHAR(40),
    FOREIGN KEY (paidBy) REFERENCES Student(id)
)Engine=InnoDB;

CREATE TABLE IF NOT EXISTS Class(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40),
    classLevel enum("beginner","intermediate","advance"),
    time TIME,
    dayOfWeek VARCHAR(40)
)Engine=InnoDB;

CREATE TABLE IF NOT EXISTS Rank(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    color VARCHAR(40)
)Engine=InnoDB;

CREATE TABLE IF NOT EXISTS StudentRank(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    studentId INT,
    rankId INT,
    isCurrent BOOLEAN,
    addedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (studentId) REFERENCES student(id),
    FOREIGN KEY (rankId) REFERENCES Rank(id)
)Engine=InnoDB;

CREATE TABLE IF NOT EXISTS Attendance(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    date DATE,
    classId INT,
    studentId INT,
    isPresent BOOLEAN,
    FOREIGN KEY (classId) REFERENCES Class(id),
    FOREIGN KEY (studentId) REFERENCES student(id)
)Engine=InnoDB;

INSERT INTO Rank(id,color) VALUES(1,"White");
INSERT INTO Rank(id,color) VALUES(2,"Yellow");
INSERT INTO Rank(id,color) VALUES(3,"Half Green");
INSERT INTO Rank(id,color) VALUES(4,"Green");
INSERT INTO Rank(id,color) VALUES(5,"Half Blue");
INSERT INTO Rank(id,color) VALUES(6,"Blue");
INSERT INTO Rank(id,color) VALUES(7,"Half Red");
INSERT INTO Rank(id,color) VALUES(8,"Red");
INSERT INTO Rank(id,color) VALUES(9,"Half Black");
INSERT INTO Rank(id,color) VALUES(10,"Black");



-- CREATE TABLE IF NOT EXISTS Student(
--     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     sid INT NOT NULL,
--     name VARCHAR(255),
--     dateOfBirth DATE,
--     joiningDate DATE,
--     phNumber VARCHAR(15),
--     email VARCHAR(50),
--     address VARCHAR(255),
--     city VARCHAR(255),
--     areacode VARCHAR(10),
--     userId INT,
--     FOREIGN KEY (userId) REFERENCES User(id)
-- )Engine = InnoDB;
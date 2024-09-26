CREATE TABLE AssignedUsers (
    CertificateId INT NOT NULL,
    UserId INT NOT NULL,
    AssignedAt DATETIME NULL,
    FOREIGN KEY (CertificateId) REFERENCES Certificates(Id),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

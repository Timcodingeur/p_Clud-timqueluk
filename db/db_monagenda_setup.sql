USE db_monagenda;

CREATE TABLE t_schedule (
  idSchedule VARCHAR(255) NOT NULL PRIMARY KEY,
  schLink VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE t_teacher (
  idTeacher varchar(100) NOT NULL PRIMARY KEY,
  teaLink varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO t_schedule (idSchedule, schLink) VALUES
("1", "https://eduvaud-my.sharepoint.com/:u:/g/personal/px86dym_eduvaud_ch/EbqPHyJIMNVLmOuIU1Y2gKgBMqfZXcgGenGTXYRadUIY1g?email=yohan.cardis%40eduvaud.ch"),
("2", "https://eduvaud-my.sharepoint.com/:u:/g/personal/px86dym_eduvaud_ch/ERYdXjFywU5EqFZ1vOvA6DEBa6Fmq2geXfVvEmyr-Q5hLA?email=dario.chasi%40eduvaud.ch"),
("3", "https://eduvaud-my.sharepoint.com/:u:/g/personal/px86dym_eduvaud_ch/EcqMJMxN68pPg6P0Q7-xkZwB0W0nPv6LSys72C_oQ_MO2w?email=Timothy.Jotterand%40eduvaud.ch"),
("4", "https://eduvaud-my.sharepoint.com/:u:/g/personal/px86dym_eduvaud_ch/ERuVDWTzqHZJl-ikV4PfeuEBjgLCLhtmoZBMPDwcVdm88w?email=alessio.lopardo%40eduvaud.ch"),
("5", "https://eduvaud-my.sharepoint.com/:u:/g/personal/px86dym_eduvaud_ch/Ec2BBNzcyFlAvI7Xc2rsuIUBMfQ6oZeSJJ7SEnyfL--9IQ?email=quentin.metroz%40eduvaud.ch"),
("6", "https://eduvaud-my.sharepoint.com/:u:/g/personal/px86dym_eduvaud_ch/EUhjvw1fXRpKqtdVy2fSlsQB3Fv4RXAaU4LlFv-g_pc-ZA?email=Luke.Moia%40eduvaud.ch"),
("7", "https://eduvaud-my.sharepoint.com/:u:/g/personal/px86dym_eduvaud_ch/EUaqzEDAVc1FijRTZgujdHABldG9r89H90Xz5KR7daXOUA?email=Cyril.Napoleone%40eduvaud.ch"),
("8", "https://eduvaud-my.sharepoint.com/:u:/g/personal/px86dym_eduvaud_ch/EeOc5XvEk5hNvcj5HmCvfZoBOVZPAnJjJ9AJ8MMIsXWePA?email=Thibaud.Racine%40eduvaud.ch"),
("9", "https://eduvaud-my.sharepoint.com/:u:/g/personal/px86dym_eduvaud_ch/EfC8S8_fn7BNpV7jsUf5Mk0BTVGyJzLq0HTqXXjHgOdYeQ?email=william.trelles1%40eduvaud.ch"),
("10", "https://eduvaud-my.sharepoint.com/:u:/g/personal/px86dym_eduvaud_ch/EZUstWBIBI5DsvILWmlZLc4Bh11bzdrCrx_KtHZyurGCAg?email=mateja.velickovic%40eduvaud.ch"),
("11", "https://eduvaud-my.sharepoint.com/:u:/g/personal/px86dym_eduvaud_ch/EUIWiyqDwSRHvP0dlYaoanEB0YUQPXCDWTZGeZGwMVU4xQ?email=nima.zarrabi%40eduvaud.ch");

USE restaurante;
CREATE TABLE Task (
 id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
 title VARCHAR(100) NOT NULL,
 labelTitle VARCHAR(200),
 completed BOOLEAN,
 labelColor VARCHAR(20)
);

CREATE TABLE alimento (
 id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
 nome VARCHAR(100) NOT NULL,
 categoria VARCHAR(100) NOT NULL,
 foto VARCHAR(200),
 valor DOUBLE(8,2),
 ativo BOOLEAN,
 recorrente BOOLEAN,
 descricao VARCHAR(255)
);

CREATE TABLE evento (
 id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
 nome VARCHAR(100) NOT NULL,
 ativo BOOLEAN
);

CREATE TABLE alimento_evento (
    alimento_id INT NOT NULL,  
    evento_id INT NOT NULL,  
    PRIMARY KEY (alimento_id, evento_id),  
    FOREIGN KEY (alimento_id) REFERENCES alimento(id) ON UPDATE CASCADE,  
    FOREIGN KEY (evento_id) REFERENCES evento(id) ON UPDATE CASCADE
);  
--drop table alimento_evento;
--drop table evento;
--drop table alimento;
--drop table schema_version;
--drop table task;



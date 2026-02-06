package br.com.deposito;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(
		info = @Info(
				title = "API - Depósito de Água e Gás ",
				version = "1.0",
				description = "API para gerenciamento de depósitos de água e gás",
				contact = @Contact(name = "Carlos Roberto", email = "crrsj1@gmail.com")
		)
)
public class DepositoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DepositoApplication.class, args);
	}

}

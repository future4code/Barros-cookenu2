![cokenuu3](https://user-images.githubusercontent.com/102332717/220787670-df6c58d1-c8a5-4b35-a5d6-536805a06ef4.png)

Render:
<br/>
Documentação:

  [![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

## 🧩 Projeto Cookenu 🥄

Esse produto nada mais é do que uma rede social, na qual os usuários podem dividir informações relevantes sobre comidas e receitas que tenham experimentado. Ela possui todas as funcionalidades mais comuns em redes sociais:

🥄 1. **Cadastro / Criar Pessoa Usuária**
    
   > Como o projeto está no início, o usuário só precisa informar: o e-mail, nome a sua senha para realizar o cadastro. A senha tem uma regra: ela deve conter, no mínimo, 6 caracteres. 
    
🥄 2. **Login**
    
   > Basta informar o email e a senha corretamente que o usuário poderá se logar na aplicação. Os endpoints de login e cadastro devem retornar **um** **token.**
    
🥄 3. **Informações do próprio perfil**
    
   > A partir do token de autenticação fornecido no login, o usuário deve ser capaz de ver as suas informações salvas no banco (id, nome e email)
    
🥄 4. **Criar receitas**
    
   > O usuário deve poder criar uma receita. A receita deve ter os seguintes atributos: título, descrição/modo de preparo e data de criação
    
🥄 5. **Seguir usuário**
    
   > Um usuário deve poder seguir outros usuários. Para isso, ele deve fornecer o id do usuário que deseja seguir. Atente-se que essa funcionalidade se assemelha ao do instagram: um usuário seguir outro, não significa que "esse outro" está seguindo o primeiro.
    
🥄 6. **Feed**
    
   > Um usuário deve poder visualizar as receitas criadas pelos usuários que ele segue. As receitas devem estar ordenadas pela data de criação.
   
  
⚠️ **Importante:** 
   - Todos os endpoints, com exceção do Signup e Login, devem exigir autenticação.
   [![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)
   
  ## 🎯 EndPoints 🥄
  
  - ### **🎯Signup**
    
    **Método:** POST
	  <br>
    **Path:** `/signup`
    
    **Entradas:**
    <br>
     Body
    ```json
    {
    	"name": "Alice",
    	"email": "alice@lbn.com",
    	"password": "123456"
    }
    ```
    
    **Saídas**
    <br>
    Body
    
    ```json
    {
    	"access_token": "token de acesso"
    }
    ```
    
    🔎 **Observações**:
    
    > O código deve validar se os três campos estão completos (ou seja se não foram enviados ou se não estão vazios) e retornar um erro caso não estejam válidos
    - O código deve gerar o id do usuário
  
    [![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)
  - ### **🎯Login**
    
    **Método:** POST
    <br>
    **Path:** `/login`
    
    **Entradas:**
    <br>
     Body
    
    ```json
    {
    	"email": "alice@lbn.com",
    	"password": "123456"
    }
    ```
    
    **Saídas**
    <br>
    Body
    
    ```json
    {
    	"access_token": "token de acesso"
    }
    ```
    
    **🔎 Observações**:
    
    > O código deve validar se os dois campos estão completos (ou seja se não foram enviados ou se não estão vazios) e retornar um erro caso não estejam válidos

    [![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

- ### **🎯Pegar próprio perfil**
    
    **Método:** GET
    <br>
    **Path:** `/user/profile`
    
    **Entradas:**
    <br>
    Headers
    
    ```
    Authorization: "token de autenticação"
    ```
    
    **Saídas**
    <br>
    Body
   
   ```json
      {
	    "id": "id do usuário",
	    "name": "Alice",
	    "email": "alice@lbn.com"
      }
    ```
   [![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)
    - ### **🎯 Pegar perfil de outro usuário**
    
    **Método:** GET
    <br>
    **Path:** `/user/:id`
    
    **Entradas:**
    <br>
    Path Param
    
    ```
    id: "id do usuário"
    ```
    
    Headers
    
    ```
    Authorization: "token de autenticação"
    ```
    
    **Saídas**
    <br>
    Body

     ```json

      {
	    "id": "id do usuário",
	    "name": "Alice",
	    "email": "alice@lbn.com"
      }
    ```
  

   [![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)


   - ### **🎯Criar receita**
    
    **Método:** POST
      <br>
    **Path:** `/recipe`
    
    **Entradas:**
    <br>
    Headers
    
    ```
    Authorization: "token de autenticação"
    ```
    
    Body
    
    ```json
    {
    	"title": "título da receita",
    	"description": "descrição da receita"
    }
    ```
    
    **🔎 Observações**:
    
    > Perceba que, no banco de dados, devemos guardar a data de criação da receita, mas o usuário não envia. Você deve assumir que a receita foi criada no momento em que o usuário bate nessa requisição

  [![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

    - ### **🎯 Pegar receita**
    
    **Método:** GET
    <br>
    **Path:** `/recipe/:id`
    
    **Entradas:**
    <br>
    Path Param
    
    ```
    id: "id da receita"
    ```
    
    Headers
    
    ```
    Authorization: "token de autenticação"
    ```
    
    **Saídas**
    <br>
    Body
    
    ```json
    {
    	"id": "id da receita",
    	"title": "Ovo Frito",
    	"description": "Pega o ovo, põe na frigideira e reza!"
    	"cratedAt": "31/12/2020"
    }
    ```

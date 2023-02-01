![Logo](https://dmitrii-belich.github.io/images/mesto.png)

# Mesto

Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. Бэкенд расположите в директории `backend/`, а фронтенд - в `frontend/`.

- IP сервера 158.160.58.118

## Посмотреть

- Frontend https://mesto.levovskiiy.nomoredomainsclub.ru/sign-in
- Backend https://api.mesto.levovskiiy.nomoredomainsclub.ru/sign-in

## Применяемые технологии

**Client:** React.js, БЭМ, HTML, CSS, JavaScript

**Server:** Node.js, Express.js, MongoDB, REST API

## Автор

- [@levovskiiy](https://www.github.com/levovskiiy)

## API

#### Получить всех пользователей

```http
  GET /users/
```

#### Получить пользователя по ID

```http
  GET /users/${id}
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `id`      | `string` | **Required**. Id пользователя |

#### Добавить пользователя в базу

```http
  POST /users/
```

| Parameter  | Type     | Description                       |
| :--------- | :------- | :-------------------------------- |
| `name`     | `string` | Имя пользователя                  |
| `about`    | `string` | Описание пользователя             |
| `email`    | `string` | **Required**. Почта пользователя  |
| `password` | `string` | **Required**. Пароль пользователя |

#### Получить текущего пользователя

```http
  GET /users/me
```

#### Изменить данные пользователя

```http
  PATCH /users/me
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `name`    | `string` | **Required**. Имя пользователя      |
| `about`   | `string` | **Required**. Описание пользователя |

#### Изменить аватар пользователя

```http
  PATCH /users/me/avatar
```

| Parameter | Type     | Description                                      |
| :-------- | :------- | :----------------------------------------------- |
| `avatar`  | `string` | **Required** **Валидируется на шаблон**. Ссылка. |

#### Получить все карточки

```http
  GET /cards/
```

#### Создать карточку

```http
  POST /cards/
```

| Parameter | Type     | Description                                                 |
| :-------- | :------- | :---------------------------------------------------------- |
| `about`   | `string` | **Required**. Описание карточки                             |
| `link`    | `string` | **Required** **Валидируется на шаблон**. Ссылка на картинку |

#### Удалить карточку по ID

```http
  DELETE /cards/${id}
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `string` | **Required**. ID карточки |

#### Поставить лайк

```http
  PUT /cards/${id}/likes
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `string` | **Required**. ID карточки |

#### Удалить лайк

```http
  DELETE /cards/${id}/likes
```

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `string` | **Required**. ID карточки |

Repository: https://github.com/levovskiiy/react-mesto-api-full

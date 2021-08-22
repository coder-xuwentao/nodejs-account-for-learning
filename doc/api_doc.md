### 接口前缀

```
http://localhost:5001/api
```

注：调用例子用postman测试的

## 管理员 admin

### 管理员注册 register

```
POST /admin/register
```

#### 参数

| 参数      | 说明     | 是否必填 |
| :-------- | :------- | :------: |
| nickname  | 昵称     |    是    |
| email     | 邮箱     |    是    |
| password1 | 密码     |    是    |
| password2 | 确认密码 |    是    |

#### 调用例子

```
post http://localhost:5001/api/admin/register

body:
nickname:shakex111
email:121411@qq.com
password1:asd123
password2:asd123
```

#### 成功操作返回

```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "email": "121411@qq.com",
        "nickname": "shakex111"
    }
}
```



### 管理员登录 login

```
POST /admin/login
```

#### 参数

| 参数     | 说明 | 是否必填 |
| :------- | :--- | :------: |
| email    | 邮箱 |    是    |
| password | 密码 |    是    |

#### 调用例子

```
post http://localhost:5001/api/admin/login

body:
email:121411@qq.com
password:asd111
```

#### 成功操作返回

```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Mjk2MDQ2NDcsImV4cCI6MTYyOTYwODI0N30.DzGk27ennb_qFcvwRRmEg_V-gw8xzHGNx7bJHx_xLFU"
    }
}
```

### 管理员身份验证 auth

```
POST /admin/auth
```

#### 参数

无

#### 必需携带token

#### 调用例子

```
get http://localhost:5001/api/admin/auth

在Authorization选项中 => TYPE选Basic Auth => Username填入token（其他忽略）
```

ajax例子

```js
import { Base64 } from 'js-base64'
const token = localStorage.getItem("token" +:')
ajax({
  url: 'http://localhost:3000/v1/admin/auth',
  method: 'GET',
  success: res => {
    console.log(res.data)
  },
  header: {
    Authorization: `Basic ${Base64.encode(token)}`
  }
})
```



#### 成功操作返回

```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "id": 7,
        "email": "121411@qq.com",
        "nickname": "shakex111"
    }
}
```

## 用户 user

### 用户注册 register

```
POST /user/register
```

#### 参数

| 参数      | 说明     | 是否必填 |
| :-------- | :------- | :------: |
| username  | 用户名   |    是    |
| email     | 邮箱     |    是    |
| password1 | 密码     |    是    |
| password2 | 确认密码 |    是    |

#### 调用例子

```
post http://localhost:5001/api/user/register

body:
username:shakexu
email:123@qq.com
password1:asd123
password2:asd123
```

#### 成功操作返回

```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "email": "123@qq.com",
        "username": "shakexu"
    }
}
```

### 用户登录 login

```
POST /user/login
```

#### 参数

| 参数     | 说明 | 是否必填 |
| :------- | :--- | :------: |
| email    | 邮箱 |    是    |
| password | 密码 |    是    |

#### 调用例子

```
post http://localhost:5001/api/admin/login

body:
email:1231@qq.com
password:asd123
```

#### 成功操作返回

```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Mjk2MDQ2NDcsImV4cCI6MTYyOTYwODI0N30.DzGk27ennb_qFcvwRRmEg_V-gw8xzHGNx7bJHx_xLFU"
    }
}
```

### 用户身份验证 auth

```
POST /user/auth
```

#### 参数

无

#### 必需携带token

#### 调用例子

```
get http://localhost:5001/api/user/auth

在Authorization选项中 => TYPE选Basic Auth => Username填入token（其他忽略）
```

ajax例子

```js
import { Base64 } from 'js-base64'
const token = localStorage.getItem("token" +:')
ajax({
  url: 'http://localhost:3000/v1/admin/auth',
  method: 'GET',
  success: res => {
    console.log(res.data)
  },
  header: {
    Authorization: `Basic ${Base64.encode(token)}`
  }
})
```



#### 成功操作返回

```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "id": 3,
        "username": "shakexu1",
        "email": "1231@qq.com",
        "status": 1  //是否废弃号
    }
}
```

### 用户列表 list

```
POST /user/list
```

#### 参数

无

#### 必需携带token

必须是admin的token

#### 调用例子

```
get http://localhost:5001/api/user/list

在Authorization选项中 => TYPE选Basic Auth => Username填入token（其他忽略）
```



#### 成功操作返回

```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "data": [
            {
                "id": 4,
                "username": "shakexu2",
                "email": "12331@qq.com",
                "status": 1
            },
            {
                "id": 3,
                "username": "shakexu1",
                "email": "1231@qq.com",
                "status": 1
            }
        ],
        "meta": {
            "current_page": 1,
            "per_page": 10,
            "count": 2,
            "total": 2,
            "total_pages": 1
        }
    }
}
```

### 用户详情 detail

```
POST /user/detail/:id
```

#### 参数

| 参数 | 说明   | 是否必填 |
| :--- | :----- | :------: |
| :id  | 用户id |    是    |

#### 

#### 必需携带token

必须是admin的token

#### 调用例子

```
get http://localhost:5001/api/user/detail/2

在Authorization选项中 => TYPE选Basic Auth => Username填入token（其他忽略）
```



#### 成功操作返回

```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "id": 4,
        "username": "shakexu2",
        "email": "12331@qq.com",
        "status": 1
    }
}
```

### 用户删除 delete

```
POST /user/delete/:id
```

#### 参数

| 参数 | 说明   | 是否必填 |
| :--- | :----- | :------: |
| :id  | 用户id |    是    |

#### 

#### 必需携带token

必须是admin的token

#### 调用例子

```
delete http://localhost:5001/api/user/delete/9

在Authorization选项中 => TYPE选Basic Auth => Username填入token（其他忽略）
```



#### 成功操作返回

```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "id": 9,
        "username": "shakexu2",
        "email": "121@qq.com"
    }
}
```

### 用户删除 put

```
put /user/update/:id
```

#### 参数

| 参数     | 说明   | 是否必填 |
| :------- | :----- | :------: |
| :id      | 用户id |    是    |
| email    | 邮箱   |    否    |
| username | 用户名 |    否    |
| status   | 状态   |    否    |

#### 

#### 必需携带token

必须是admin的token

#### 调用例子

```
delete http://localhost:5001/api/user/delete/9

在Authorization选项中 => TYPE选Basic Auth => Username填入token（其他忽略）
```



#### 成功操作返回

```json
{
    "code": 200,
    "msg": "success",
    "errorCode": 0,
    "data": {
        "id": 10,
        "username": "shakexu3",
        "email": "1234@qq.com",
        "status": 1
    }
}
```

## 
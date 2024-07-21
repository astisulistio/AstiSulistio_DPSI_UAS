# █▓▒▒░░░🆀🆄🅸🅲🅺🆂🅴🅻🅻░░░▒▒▓█

<aside>
💡 An Shopping Website.

</aside>

# Bahasa Indonesia

👋 Penjual online, QuickSell hadir untuk jadi *partner in crime* kamu! 🦹‍♀️🚀 Kami platform terdepan yang bikin jualan online jadi semudah ABC. Gak peduli kamu bisnis rumahan atau perusahaan besar, QuickSell siap bantu kamu raih cuan maksimal! 💪💰

**Visi Kami?** Sederhana, jadi platform andalan semua penjual online di Indonesia! 🏆 Kami pengen bikin proses jualan jadi secepat kilat ⚡ dan semudah menjentikkan jari. 🫰

**Misi Kami?** Ada 3, nih:

1. 💡 **Inovasi Terus-terusan:** Kami gak pernah berhenti mengembangkan fitur-fitur canggih yang bikin jualan makin gampang dan menyenangkan!
2. 💖 **Customer Support Paling Oke:** Ada pertanyaan atau masalah? Tim kami siap siaga 24/7 buat bantu kamu!
3. 🕹️ **Semudah Main Game:** Antarmuka kami didesain semudah mungkin, jadi siapapun bisa langsung pakai tanpa ribet!

Yuk, gabung QuickSell sekarang dan rasakan sendiri bedanya! 🚀🚀🚀

# English

Hey there, online sellers! QuickSell is here to be your ultimate sidekick! 🦸‍♀️🚀 We're the leading platform that makes selling online as easy as pie. 🥧 Whether you're a small home business or a large corporation, QuickSell is ready to help you reach your full potential! 💪💰

**Our Vision?** It's simple: to become the go-to platform for all online sellers in Indonesia! 🏆 We want to make the selling process as fast as lightning ⚡ and as easy as snapping your fingers. 🫰

**Our Mission?** We have 3:

1. 💡 **Constant Innovation:** We never stop developing cutting-edge features that make selling easier and more enjoyable!
2. 💖 **Top-Notch Customer Support:** Have a question or problem? Our team is available 24/7 to help you out!
3. 🕹️ **As Easy as Playing a Game:** Our interface is designed to be as user-friendly as possible, so anyone can use it without any hassle!

Join QuickSell now and experience the difference yourself! 🚀🚀🚀

Dokumentasi API

Base URL :

> [**https://astisulistio-dpsiuas-9d8f0aaf1f7e.herokuapp.com**](https://astisulistio-dpsiuas-9d8f0aaf1f7e.herokuapp.com/)
> 

# **Testing Endpoints :**

## Register

**URL : https://astisulistio-dpsiuas-9d8f0aaf1f7e.herokuapp.com/api/register**

Method : ‘Post’

```jsx
{
    "username": "user445123",
    "email": "user12453@example.com",
    "password": "password41523"
}
```

Respon : 

```jsx
{
"message": "Registrasi berhasil"
}
```

Endpoint ini digunakan untuk mendaftar pengguna baru. Pastikan `username`, `email`, dan `password` sesuai format dan validasi yang telah ditetapkan.

## **Login**

URL : https://astisulistio-dpsiuas-9d8f0aaf1f7e.herokuapp.com/api/login

Method : ‘Post’

```jsx
{
    "username": "astisulistiogaming",
    "password": "asti123"
}

```

Respon : 

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTcyMTU1MjA1NSwiZXhwIjoxNzIxNTU1NjU1fQ.xD-FUzrki2FFSO_my5hyrsCTT_IdyMxilN26QIELOeQ"
}
```

Endpoint ini digunakan untuk login dan mendapatkan token JWT yang diperlukan untuk mengakses endpoint yang dilindungi. Pastikan `username` dan `password` valid.

## **Testing JWT :**

URL : https://astisulistio-dpsiuas-9d8f0aaf1f7e.herokuapp.com/api/protected

Method : ‘GET’

<aside>
💡 Headers : **Authorization** 
Value :  **Bearer** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImlhdCI6MTcyMTU1MjA1NSwiZXhwIjoxNzIxNTU1NjU1fQ.xD-FUzrki2FFSO_my5hyrsCTT_IdyMxilN26QIELOeQ

</aside>

Respon : 

```json
{
    "message": "Token is valid",
    "user": {
        "id": 20,
        "username": "astisulistiogaming",
        "email": "astigaming1@gmail.com",
        "password": "$2b$10$qwbBEXWd3m9df6tG8AZAte5FE7ejwH/tZvDTJpg4hJ5Ow/D1WLeBq",
        "createdAt": "2024-07-21T06:05:23.000Z",
        "updatedAt": "2024-07-21T06:05:23.000Z"
    }
}
```

Password ter-hash.

Endpoint ini digunakan untuk memverifikasi validitas token JWT. Token harus disertakan dalam header `Authorization` dengan format `Bearer <token>`.

### 

[bcrypt](https://en.wikipedia.org/wiki/Bcrypt)

## Testing API ORDER

URL : https://astisulistio-dpsiuas-9d8f0aaf1f7e.herokuapp.com/api/order

Method : ‘POST’

```jsx
{
    "items": [
        {
            "price": 100,
            "quantity": 2
        }
    ],
    "name": "Asti Sulistio",
    "email": "astisulistio@example.com",
    "address": "123 Karawang, Jawa Selatan"
}

```

Respon :

```jsx
{
    "message": "Order placed successfully"
}
```

## **Testing API ORDER by ID**

URL : https://astisulistio-dpsiuas-9d8f0aaf1f7e.herokuapp.com/api/orders/1

Method : ‘GET’

Respon : 

```jsx
{
    "id": 4,
    "items": [
        {
            "price": 100,
            "quantity": 2
        }
    ],
    "totalAmount": 200,
    "name": "Asti Sulistio",
    "email": "astisulistio@example.com",
    "address": "123 Karawang, Jawa Selatan",
    "createdAt": "2024-07-21T09:35:53.000Z",
    "updatedAt": "2024-07-21T09:35:53.000Z"
}
```

## Hasil Di Database Menggunakan FreeSqlDatabase :

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/eff5db1f-e9dd-4466-8ba3-d49ff4c1049e/c2669759-73fe-454e-8ed2-29c95986c404/Untitled.png)

# **Error Handling**

**`400 Bad Request**: Jika ada kesalahan dalam format data yang dikirim.`

**`401 Unauthorized**: Jika token JWT tidak valid atau tidak ada.`

**`404 Not Found**: Jika pesanan dengan ID tertentu tidak ditemukan.`

**`500 Internal Server Error**: Jika ada masalah dengan server.`

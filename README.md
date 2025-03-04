# 💍 Letícia & Ryan - Wedding Management

This is a system to manage the details of Letícia and Ryan's wedding. It includes features such as guest management, RSVPs, table organization, automatic reminders and much more!

## 🚀 Features

- 📋 **Invitation Management**: Individual and group control of guests.
- ✅ **RSVP**: Each invitation can include multiple people and a PIN code for confirmation.
- 🏷️ **Table Organization**: Optimized distribution of guests at tables.
- 🔔 **Automatic Reminders**: Notifications for guests.
- 📢 **Personalized Advertising**: Information and notifications about the event.

## 🛠️ Technologies Used

- **Frontend:** Next.js
- **Backend:** Node.js (Express)
- **Database:** PostgreSQL
- **Architecture:** MVC (Model-View-Controller)

## 📦 Installation

1. Clone the repository:

```sh
git clone https://github.com/ryangwalchmei/leticiaeryan.git
cd leticiaeryan
```

2. Install the dependencies:

```sh
npm install
```

3. Configure the environment variables (.env.devlopment):

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=local_user
POSTGRES_DB=local_db
POSTGRES_PASSWORD=local_password
DATABASE_URL=postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB
```

4. Install docker correctly in your development environment and run:

```sh
npm run services:up && docker ps
```

if everything is correct, this command will start `postgres` in docker and list the running docker images.
then just run `npm run services:stop && npm run services:down` to remove the postgres execution.

5. Run the application:

```sh
npm run dev
```

this command will automatically start the postgres service, run pending migrations and start the next server on port 3000.

## 👥 Contribution

If you want to contribute to the project, follow these steps:

1. Fork the repository;
2. Create a new branch:

```sh
git checkout -b my-feature
```

4. Make your changes and commit;

```sh
git commit -m "<type>[optional scope]: <description>"
```

5. Push to the repository:

```sh
git push origin minha-feature
```

6. Open a **Pull Request**

Made with ❤️ by [@ryangwalchmei](https://github.com/ryangwalchmei/) for [@letvitoria](https://www.instagram.com/l.vitoria18)👰🤵

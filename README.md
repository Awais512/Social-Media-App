# 🚀 Modern Social Media Platform

A feature-rich social media application built with Next.js 15, featuring real-time notifications, media sharing, and advanced user interactions.

![Next JS](https://img.shields.io/badge/Next.js%2015-black?style=flat&logo=next.js&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat&logo=Prisma&logoColor=white)

## ✨ Features

- **🔐 Authentication**
  - Multiple auth strategies (Email, Google)
  - Session-based authentication
  - Protected routes and API endpoints
  - Custom username support

- **👤 User Profiles**
  - Customizable display names
  - Profile avatars
  - Bio customization
  - Follow/Unfollow system
  - User activity tracking

- **📝 Posts**
  - Rich text content
  - Media attachments (Images & Videos)
  - Like/Unlike functionality
  - Bookmark system
  - Comments
  - Real-time updates

- **🔔 Notifications**
  - Real-time notifications
  - Multiple notification types:
    - Like notifications
    - Follow notifications
    - Comment notifications
  - Read/Unread status
  - Activity tracking

- **📸 Media Support**
  - Image uploads
  - Video uploads
  - Multiple attachments per post
  - Media type validation

## 🗄️ Database Schema

```prisma
// User and Authentication
model User {
  id                    String         @id
  username              String         @unique
  displayName           String
  email                 String?        @unique
  passwordHash          String?
  googleId              String?        @unique
  avatarUrl             String?
  bio                   String?
  sessions              Session[]
  posts                 Post[]
  following             Follow[]       @relation("Following")
  followers             Follow[]       @relation("Followers")
  likes                 Like[]
  bookmarks             Bookmark[]
  comments              Comment[]
  receivedNotifications Notification[] @relation("Recipient")
  issuedNotifications   Notification[] @relation("Issuer")
  createdAt             DateTime       @default(now())
}

// Post and Media
model Post {
  id                  String         @id @default(cuid())
  content             String
  userId              String
  user                User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  attachments         Media[]
  likes               Like[]
  bookmarks           Bookmark[]
  comments            Comment[]
  linkedNotifications Notification[]
  createdAt           DateTime       @default(now())
}

model Media {
  id        String    @id @default(cuid())
  postId    String?
  post      Post?     @relation(fields: [postId], references: [id], onDelete: SetNull)
  type      MediaType
  url       String
  createdAt DateTime  @default(now())
}

// Interactions
model Comment {
  id        String   @id @default(cuid())
  content   String
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  postId    String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
}

model Like {
  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  postId String
  post   Post   @relation(fields: [postId], references: [id], onDelete: Cascade)
  @@unique([userId, postId])
}

model Bookmark {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  postId    String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  @@unique([userId, postId])
}
```


```

## 🛠️ Setup & Installation

1. **Clone and Install**
```bash
git clone https://github.com/yourusername/social-media-app.git
cd social-media-app
pnpm install
```

2. **Environment Setup**
```bash
# .env
POSTGRES_PRISMA_URL="your-pooling-db-url"
POSTGRES_URL_NON_POOLING="your-direct-db-url"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

3. **Database Setup**
```bash
npx prisma generate
npx prisma db push
```

4. **Start Development**
```bash
pnpm dev
```

## 🔐 Authentication Flow

```typescript
// Example of auth implementation
async function signUp(username: string, email: string, password: string) {
  const hashedPassword = await generateHash(password);
  
  const user = await prisma.user.create({
    data: {
      id: generateId(),
      username,
      email,
      passwordHash: hashedPassword,
      displayName: username,
    }
  });
  
  return createSession(user.id);
}
```

## 📝 Post Creation

```typescript
// Example of post creation with media
async function createPost(
  userId: string,
  content: string,
  media?: { type: 'IMAGE' | 'VIDEO'; url: string }[]
) {
  return prisma.post.create({
    data: {
      userId,
      content,
      attachments: {
        create: media?.map(m => ({
          type: m.type,
          url: m.url
        }))
      }
    },
    include: {
      attachments: true,
      user: true
    }
  });
}
```

## 🔔 Notification System

```typescript
// Example of notification creation
async function createNotification(
  type: 'LIKE' | 'FOLLOW' | 'COMMENT',
  issuerId: string,
  recipientId: string,
  postId?: string
) {
  return prisma.notification.create({
    data: {
      type,
      issuerId,
      recipientId,
      postId
    }
  });
}
```

## 🚀 Deployment

1. **Database Setup**
   - Set up PostgreSQL on your preferred provider
   - Update environment variables

2. **Deploy Application**
```bash
vercel deploy
```

## 🔒 Security Features

- Password hashing
- Session management
- CSRF protection
- Rate limiting
- Input validation
- Media upload validation

## 📈 Performance Optimizations

- Connection pooling
- Full-text search capability
- Efficient relations
- Cascading deletes
- Unique constraints
- Index optimization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ by Awais Raza

import bcrypt from "bcryptjs"

// Script to create admin user
// Run this once to create the admin account in MongoDB

const createAdmin = async () => {
  const email = "admin@dental.com"
  const password = "admin123"

  const passwordHash = await bcrypt.hash(password, 10)

  console.log("Admin credentials:")
  console.log("Email:", email)
  console.log("Password:", password)
  console.log("Password Hash:", passwordHash)
  console.log("\nInsert this into MongoDB:")
  console.log(
    JSON.stringify(
      {
        email,
        passwordHash,
        createdAt: new Date(),
      },
      null,
      2,
    ),
  )
}

createAdmin()

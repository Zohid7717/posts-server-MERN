import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Register
export const register = async (req, res) => {
  try {
    const { username, password } = req.body

    const isUsed = await User.findOne({ username })
    if (isUsed) {
      return res.json({
        message: 'Данный username уже занят.'
      })
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = new User({
      username,
      password: hash,
    })

    const token = jwt.sign(
      { id:newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    await newUser.save()

    res.json({
      newUser, token, message: 'Регистрация прошла успешно.'
    })

  } catch (error) {
    res.json({ message: 'Ошибка при создании пользователя.' })
  }
}
//Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) {
      return res.json({
        message: 'Данные введены не правильно.'
      })
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.json({
        message: 'Данные введены не правильно.'
      })
    }
    const token = jwt.sign(
      { id:user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )
    res.json({
      token, user, message: 'Добро пожаловать'
    })
  } catch (error) {
    res.json({ message: 'Ошибка при авторизации.' })
  }
}
//Get
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      return res.json({
        message: 'Такой user не найден'
      })
    }
    const token = jwt.sign(
      { id:user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )
    res.json({
      user,
      token
    })
  } catch (error) {
    res.json({ message: 'Нет доступа.'})
  }
}
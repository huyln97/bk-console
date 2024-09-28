import z from 'zod/lib'

export const validateUser = z.object({
    email: z
      .string()
      .min(1, 'Vui lòng nhập email')
      .email(
        'Email bạn nhập không hợp lệ. Hãy chắc chắn rằng nó dưới dạng example@email.com'
      ),
    password: z.string().min(1, 'Vui lòng nhập mật khẩu')
  })
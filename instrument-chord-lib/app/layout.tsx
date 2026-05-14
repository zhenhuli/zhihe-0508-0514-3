import type { Metadata } from 'next'
import '../styles/globals.scss'

export const metadata: Metadata = {
  title: '吉他和弦图鉴库',
  description: '吉他和弦指法图鉴库 - 学习和探索各种吉他和弦',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}

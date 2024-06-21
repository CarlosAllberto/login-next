'use client'

import React from 'react'

export default function Register() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex justify-center gap-4">
        <div className="border border-zinc-800 rounded-3xl p-16 bg-zinc-900 flex flex-col gap-4 w-4/12">
          <h3 className="text-center text-white font-semibold text-3xl">User</h3>
          <p className="text-white/60">
            Mussum Ipsum, cacilds vidis litro abertis. Per aumento de cachacis, eu reclamis. A ordem
            dos tratores não altera o pão duris. Tá deprimidis, eu conheço uma cachacis que pode
            alegrar sua vidis. Quem num gosta di mim que vai caçá sua turmis!
          </p>
          <a href="/">
            <button
              className="bg-white ps-5 pe-5 pt-2 pb-2 rounded-md w-full mt-4"
            >
              Selecionar
            </button>
          </a>
        </div>
        <div className="border border-zinc-800 rounded-3xl p-16 bg-zinc-900 flex flex-col gap-4 w-4/12">
          <h3 className="text-center text-white font-semibold text-3xl">Admin</h3>
          <p className="text-white/60">
            Mussum Ipsum, cacilds vidis litro abertis. Per aumento de cachacis, eu reclamis. A ordem
            dos tratores não altera o pão duris. Tá deprimidis, eu conheço uma cachacis que pode
            alegrar sua vidis. Quem num gosta di mim que vai caçá sua turmis!
          </p>
          <a href="/">
            <button
              className="bg-white ps-5 pe-5 pt-2 pb-2 rounded-md w-full mt-4"
            >
              Selecionar
            </button>
          </a>
        </div>
      </div>
		</main>
	)
}

'use client'

import Link from 'next/link'
import { Content, asLink } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import WordMark from '@/components/WordMark'
import ButtonLink from '@/components/ButtonLink'

import { MdMenu, MdClose } from 'react-icons/md'

type NavbarProps = {
  settings: Content.SettingsDocument
}
const Navbar = ({ settings }: NavbarProps) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav aria-label="Main" className="px-4 py-4 md:px-6 md:py-6">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <Link href="/" className="z-50" onClick={() => setOpen(false)}>
            <WordMark />
            <span className="sr-only"></span>
          </Link>

          <button
            className="block p-2 text-3xl text-white md:hidden"
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <MdMenu />
            <span className="sr-only">Open Menu</span>
          </button>
        </div>

        {/* Mobile Navbar */}
        <div
          className={clsx(
            'fixed bottom-0 left-0 right-0 top-0 z-40 flex flex-col items-end gap-4 bg-[#070815] pr-4 pt-20 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden',
            open ? 'translate-x-0' : 'translate-x-[100%]',
          )}
        >
          <button
            className="fixed right-4 top-6 mb-4 block p-2 text-3xl text-white md:hidden"
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <MdClose />
            <span className="sr-only">Close Menu</span>
          </button>

          <div className="grid justify-items-end gap-6">
            {settings.data.navigation.map((item) => {
              if (item.cta_button)
                return (
                  <ButtonLink
                    key={item.label}
                    field={item.link}
                    aria-current={
                      pathname.includes(asLink(item.link) as string)
                        ? 'page'
                        : undefined
                    }
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </ButtonLink>
                )

              return (
                <PrismicNextLink
                  key={item.label}
                  field={item.link}
                  className="inline-flex min-h-11 items-center text-3xl"
                  onClick={() => setOpen(false)}
                  aria-current={
                    pathname.includes(asLink(item.link) as string)
                      ? 'page'
                      : undefined
                  }
                >
                  {item.label}
                </PrismicNextLink>
              )
            })}
          </div>
        </div>
        {/* Desktop Navbar */}
        <ul className="hidden gap-6 md:flex">
          {settings.data.navigation.map((item) => {
            if (item.cta_button)
              return (
                <li key={item.label}>
                  <ButtonLink
                    field={item.link}
                    aria-current={
                      pathname.includes(asLink(item.link) as string)
                        ? 'page'
                        : undefined
                    }
                  >
                    {item.label}
                  </ButtonLink>
                </li>
              )

            return (
              <li key={item.label}>
                <PrismicNextLink
                  field={item.link}
                  className="inline-flex min-h-11 items-center"
                >
                  {item.label}
                </PrismicNextLink>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
export default Navbar

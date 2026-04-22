import React, { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react'

import { clsx } from 'clsx'

export const Table = forwardRef<ComponentRef<'table'>, ComponentPropsWithoutRef<'table'>>(
  ({ className, ...rest }, ref) => {
    return (
      <table
        className={clsx(
          'w-full border-collapse border border-t-0 border-[var(--color-dark-500)] text-[var(--font-size-s)]',
          className
        )}
        {...rest}
        ref={ref}
      />
    )
  }
)

export const TableHead = forwardRef<ComponentRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  ({ className, ...rest }, ref) => {
    return <thead className={className} {...rest} ref={ref} />
  }
)

export const TableBody = forwardRef<ComponentRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  ({ className, ...rest }, ref) => {
    return <tbody className={className} {...rest} ref={ref} />
  }
)

export const TableRow = forwardRef<ComponentRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  ({ className, ...rest }, ref) => {
    return <tr className={className} {...rest} ref={ref} />
  }
)

export const TableHeaderCell = forwardRef<ComponentRef<'th'>, ComponentPropsWithoutRef<'th'>>(
  ({ className, ...rest }, ref) => {
    return (
      <th
        className={clsx(
          'bg-[var(--color-dark-500)] px-6 py-3 text-left font-[var(--font-weight-semibold)]',
          className
        )}
        {...rest}
        ref={ref}
      />
    )
  }
)

export const TableCell = forwardRef<ComponentRef<'td'>, ComponentPropsWithoutRef<'td'>>(
  ({ className, ...rest }, ref) => {
    return (
      <td className={clsx('border-b border-[var(--color-dark-500)] px-6 py-3', className)} {...rest} ref={ref} />
    )
  }
)

Table.displayName = 'Table'
TableHead.displayName = 'TableHead'
TableBody.displayName = 'TableBody'
TableRow.displayName = 'TableRow'
TableCell.displayName = 'TableCell'
TableHeaderCell.displayName = 'TableHeaderCell'

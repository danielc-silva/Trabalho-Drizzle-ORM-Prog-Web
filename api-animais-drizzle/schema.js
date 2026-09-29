import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';

export const animais = pgTable('animais', {
  id: serial('id').primaryKey(),
  nome: varchar('nome', { length: 100 }).notNull(),
  especie: varchar('especie', { length: 50 }).notNull(),
  idade: integer('idade').notNull()
});
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = [
    { name: 'Riz', defaultUnit: '1 kg', category: 'Céréales' },
    { name: 'Haricot', defaultUnit: '1 kg', category: 'Légumineuses' },
    { name: 'Farine de maïs', defaultUnit: '1 kg', category: 'Céréales' },
    { name: 'Huile de palme', defaultUnit: '1 litre', category: 'Autres' },
    { name: 'Tomate', defaultUnit: 'tas', category: 'Légumes' }
  ];

  const markets = [
    {
      marketName: 'Virunga',
      city: 'Goma',
      commune: 'Karisimbi',
      province: 'Nord-Kivu',
      latitude: -1.6792,
      longitude: 29.2228
    },
    {
      marketName: 'Kituku',
      city: 'Goma',
      commune: 'Goma',
      province: 'Nord-Kivu',
      latitude: -1.6705,
      longitude: 29.2147
    },
    {
      marketName: 'Alanine',
      city: 'Beni',
      commune: 'Mulekera',
      province: 'Nord-Kivu',
      latitude: 0.4911,
      longitude: 29.4731
    }
  ];

  for (const p of products) {
    const exists = await prisma.product.findFirst({
      where: { name: p.name }
    });

    if (!exists) {
      await prisma.product.create({ data: p });
    }
  }
  await prisma.product.createMany({
  data: [
    {
      name: "Riz",
      defaultUnit: "kg",
      weeklyConsumptionPerPerson: 1.5
    },
    {
      name: "Haricot",
      defaultUnit: "kg",
      weeklyConsumptionPerPerson: 1
    },
    {
      name: "Farine",
      defaultUnit: "kg",
      weeklyConsumptionPerPerson: 1
    },
    {
      name: "Huile de palme",
      defaultUnit: "L",
      weeklyConsumptionPerPerson: 0.3
    }
  ]
})
  for (const m of markets) {
    const exists = await prisma.marketLocation.findFirst({
      where: {
        marketName: m.marketName,
        city: m.city ?? undefined
      }
    });

    if (!exists) {
      await prisma.marketLocation.create({ data: m });
    }
  }

  console.log('Seed BFHK terminé');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
import mongoose from 'mongoose';
import Item from "../models/Item.js";


const seedData = [
    {
        name: "Health Potion",
        description: "A magical potion that restores 50 HP when consumed",
        quantity: 100,
        createdBy: "admin"
    },
    {
        name: "Steel Sword",
        description: "A well-crafted sword made from high-quality steel",
        quantity: 25,
        createdBy: "admin"
    },
    {
        name: "Leather Armor",
        description: "Light armor that provides basic protection",
        quantity: 50,
        createdBy: "admin"
    },
    {
        name: "Magic Scroll",
        description: "A scroll containing basic fire spells",
        quantity: 30,
        createdBy: "admin"
    },
    {
        name: "777 Elixir",
        description: "A mystical elixir that brings immense fortune and luck to the drinker. Its golden hue shimmers with magical potential, crafted from the rarest celestial ingredients found only during the alignment of seven stars. The number 777 is etched in glowing runes on the crystal vial.",
        quantity: 77,
        createdBy: "admin"
    },
    {
        name: "Lucky Blade",
        description: "This legendary sword was forged during the 777th cycle of the lunar calendar. Its blade gleams with an otherworldly light, said to bring good fortune to its wielder. Seven enchanted gems are embedded in its hilt.",
        quantity: 7,
        createdBy: "admin"
    }
];

async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected successfully');

        console.log('Clearing existing items...');
        await Item.deleteMany({});
        console.log('Existing items cleared');

        console.log('Inserting seed data...');
        const insertedItems = await Item.insertMany(seedData);
        console.log(`Successfully seeded ${insertedItems.length} items`);

        console.log('Seed complete! Here are the inserted items:');
        insertedItems.forEach(item => {
            console.log(`- ${item.name}: ${item.quantity} units`);
        });

    } catch (error) {
        console.error('Error while seeding:', error);
        process.exit(1);
    }
    process.exit(0);
}

seed();
import mongoose from 'mongoose';
import User from '../models/User.js';
import Video from '../models/Video.js';
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Video.deleteMany({});
    console.log('Cleared existing users and videos');

    // Create a test user
    const testUser = await User.create({
      username: 'testchannel',
      email: 'test@example.com',
      password: 'test123456', // Will be hashed automatically
      channelName: 'Test Channel',
      channelDescription: 'Welcome to the test channel!',
    });
    console.log(`✅ Test user created: ${testUser.username}`);

    const sampleVideos = [
      {
        title: "Acoustic Guitar Covers - Relaxing Music Collection",
        description: "Beautiful acoustic guitar covers of popular songs.",
        category: "Music",
        videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
        thumbnailUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=60",
        duration: 3600,
        views: 125400,
        creator: testUser._id
      },
      {
        title: "Lo-fi Hip Hop Beats - Study & Chill Mix",
        description: "10 hours of relaxing lo-fi hip hop beats.",
        category: "Music",
        videoUrl: "https://www.youtube.com/embed/DWcJFNfaw9c",
        thumbnailUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=60",
        duration: 36000,
        views: 2450000,
        creator: testUser._id
      },
      {
        title: "Classical Piano Masterpieces - Beethoven & Mozart",
        description: "Experience the greatest classical piano compositions.",
        category: "Music",
        videoUrl: "https://www.youtube.com/embed/33gBjigsXA4",
        thumbnailUrl: "https://images.unsplash.com/photo-1520527053377-ab25058fc36c?auto=format&fit=crop&w=800&q=60",
        duration: 7200,
        views: 890000,
        creator: testUser._id
      },
      {
        title: "Summer Indie Pop Hits - Best Tracks 2024",
        description: "The hottest indie pop songs of summer 2024.",
        category: "Music",
        videoUrl: "https://www.youtube.com/embed/kJQP7kiw9Fk",
        thumbnailUrl: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&w=800&q=60",
        duration: 4500,
        views: 567890,
        creator: testUser._id
      },
      {
        title: "Jazz Improvisation - Live Studio Performance",
        description: "Amazing live jazz improvisation performance.",
        category: "Music",
        videoUrl: "https://www.youtube.com/embed/SHnToaIvznI",
        thumbnailUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=60",
        duration: 5400,
        views: 234560,
        creator: testUser._id
      },
      {
        title: "Electronic Dance Music - EDM Festival Mix",
        description: "High-energy electronic dance music.",
        category: "Music",
        videoUrl: "https://www.youtube.com/embed/5HLHJRsDZrI",
        thumbnailUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=60",
        duration: 3300,
        views: 1234567,
        creator: testUser._id
      },
      {
        title: "NBA Highlights - Best Plays of the Season",
        description: "Watch the most incredible NBA plays.",
        category: "Sports",
        videoUrl: "https://www.youtube.com/embed/G_-BIFGldhE",
        thumbnailUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=60",
        duration: 2400,
        views: 2345678,
        creator: testUser._id
      },
      {
        title: "Elden Ring - Boss Battle Walkthrough",
        description: "Learn how to defeat the hardest bosses.",
        category: "Gaming",
        videoUrl: "https://www.youtube.com/embed/oWzz-r9PG2Q",
        thumbnailUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=60",
        duration: 1800,
        views: 1234567,
        creator: testUser._id
      }
    ];

    const insertedVideos = await Video.insertMany(sampleVideos);
    console.log(`✅ ${insertedVideos.length} sample videos added successfully!`);
    console.log('\n📝 Test Credentials:');
    console.log('Email: test@example.com');
    console.log('Password: test123456');

    await mongoose.connection.close();
    console.log('\n✅ Database seeding complete!');
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();

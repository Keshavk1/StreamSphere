const mongoose = require('mongoose');
const User = require('./models/User');
const Video = require('./models/Video');
require('dotenv').config();

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
  // Music Category
  {
    title: "Acoustic Guitar Covers - Relaxing Music Collection",
    description: "Beautiful acoustic guitar covers of popular songs.",
    category: "Music",
    videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
    thumbnailUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=60",
    duration: 3600,
    views: 125400,
    creator: "testUser._id"
  },
  {
    title: "Lo-fi Hip Hop Beats - Study & Chill Mix",
    description: "10 hours of relaxing lo-fi hip hop beats.",
    category: "Music",
    videoUrl: "https://www.youtube.com/embed/DWcJFNfaw9c",
    thumbnailUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=60",
    duration: 36000,
    views: 2450000,
    creator: "testUser._id"
  },
  {
    title: "Classical Piano Masterpieces - Beethoven & Mozart",
    description: "Experience the greatest classical piano compositions.",
    category: "Music",
    videoUrl: "https://www.youtube.com/embed/33gBjigsXA4",
    thumbnailUrl: "https://images.unsplash.com/photo-1520527053377-ab25058fc36c?auto=format&fit=crop&w=800&q=60",
    duration: 7200,
    views: 890000,
    creator: "testUser._id"
  },
  {
    title: "Summer Indie Pop Hits - Best Tracks 2024",
    description: "The hottest indie pop songs of summer 2024.",
    category: "Music",
    videoUrl: "https://www.youtube.com/embed/kJQP7kiw9Fk",
    thumbnailUrl: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&w=800&q=60",
    duration: 4500,
    views: 567890,
    creator: "testUser._id"
  },
  {
    title: "Jazz Improvisation - Live Studio Performance",
    description: "Amazing live jazz improvisation performance.",
    category: "Music",
    videoUrl: "https://www.youtube.com/embed/SHnToaIvznI",
    thumbnailUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=60",
    duration: 5400,
    views: 234560,
    creator: "testUser._id"
  },
  {
    title: "Electronic Dance Music - EDM Festival Mix",
    description: "High-energy electronic dance music.",
    category: "Music",
    videoUrl: "https://www.youtube.com/embed/5HLHJRsDZrI",
    thumbnailUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=60",
    duration: 3300,
    views: 1234567,
    creator: "testUser._id"
  },
  {
    title: "Country Songs - Golden Hits Collection",
    description: "The best country songs from legends.",
    category: "Music",
    videoUrl: "https://www.youtube.com/embed/kffacxfA7g4",
    thumbnailUrl: "https://images.unsplash.com/photo-1527261834078-9b37d35a4a32?auto=format&fit=crop&w=800&q=60",
    duration: 6000,
    views: 445678,
    creator: "testUser._id"
  },
  {
    title: "K-pop Dance Choreography Tutorial",
    description: "Learn popular K-pop dance moves step by step.",
    category: "Music",
    videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
    thumbnailUrl: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=60",
    duration: 1800,
    views: 876543,
    creator: "testUser._id"
  },
  {
    title: "Reggae Vibes - Bob Marley & Friends",
    description: "Relaxing reggae music featuring Bob Marley.",
    category: "Music",
    videoUrl: "https://www.youtube.com/embed/weeI1G46q0o",
    thumbnailUrl: "https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?auto=format&fit=crop&w=800&q=60",
    duration: 4200,
    views: 567234,
    creator: "testUser._id"
  },
  {
    title: "Heavy Metal Anthems - Greatest Hits",
    description: "Epic heavy metal songs that defined the genre.",
    category: "Music",
    videoUrl: "https://www.youtube.com/embed/CD-E-B7vLEA",
    thumbnailUrl: "https://images.unsplash.com/photo-1514525253361-b83f859b73c0?auto=format&fit=crop&w=800&q=60",
    duration: 5100,
    views: 723456,
    creator: "testUser._id"
  },
  {
    title: "Soul Music Essentials - Aretha Franklin & Legends",
    description: "Timeless soul music featuring soul icons.",
    category: "Music",
    videoUrl: "https://www.youtube.com/embed/kJQP7kiw9Fk",
    thumbnailUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=60",
    duration: 4800,
    views: 389456,
    creator: "testUser._id"
  },

  // Sports Category
  {
    title: "NBA Highlights - Best Plays of the Season",
    description: "Watch the most incredible NBA plays.",
    category: "Sports",
    videoUrl: "https://www.youtube.com/embed/G_-BIFGldhE",
    thumbnailUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=60",
    duration: 2400,
    views: 2345678,
    creator: "testUser._id"
  },
  {
    title: "Football Championship Game - Full Match Replay",
    description: "Watch the complete football championship game.",
    category: "Sports",
    videoUrl: "https://www.youtube.com/embed/rWjVUBfNBVc",
    thumbnailUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=60",
    duration: 9000,
    views: 1876543,
    creator: "testUser._id"
  },
  {
    title: "Tennis Grand Slam Finals - Epic Rally Compilation",
    description: "Witness the greatest tennis rallies.",
    category: "Sports",
    videoUrl: "https://www.youtube.com/embed/Zl6YbYfXI64",
    thumbnailUrl: "https://upload.wikimedia.org/wikipedia/en/f/f5/UEFA_Champions_League.svg",
    duration: 3600,
    views: 567890,
    creator: "testUser._id"
  },
  {
    title: "Boxing KO Compilation - Fastest Knockouts",
    description: "The fastest and most devastating knockouts.",
    category: "Sports",
    videoUrl: "https://www.youtube.com/embed/UJWz_K4K8mw",
    thumbnailUrl: "https://images.unsplash.com/photo-1495555687398-3f50d6e79e1e?auto=format&fit=crop&w=800&q=60",
    duration: 2100,
    views: 3456789,
    creator: "testUser._id"
  },

  // Gaming Category
  {
    title: "Elden Ring - Boss Battle Walkthrough",
    description: "Learn how to defeat the hardest bosses.",
    category: "Gaming",
    videoUrl: "https://www.youtube.com/embed/oWzz-r9PG2Q",
    thumbnailUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=60",
    duration: 1800,
    views: 1234567,
    creator: "testUser._id"
  },
  {
    title: "Fortnite Battle Royale - Victory Royale Gameplay",
    description: "Epic Fortnite gameplay moments.",
    category: "Gaming",
    videoUrl: "https://www.youtube.com/embed/nRSBvCdk8go",
    thumbnailUrl: "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?auto=format&fit=crop&w=800&q=60",
    duration: 1200,
    views: 2345678,
    creator: "testUser._id"
  },
  {
    title: "Minecraft Speedrun - World Record Attempt",
    description: "Watch an incredibly fast Minecraft speedrun.",
    category: "Gaming",
    videoUrl: "https://www.youtube.com/embed/0o9qQP0l2-c",
    thumbnailUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=60",
    duration: 900,
    views: 1876543,
    creator: "testUser._id"
  },

  // Education Category
  {
    title: "Python Programming - Complete Beginner's Course",
    description: "Learn Python from scratch.",
    category: "Education",
    videoUrl: "https://www.youtube.com/embed/YXPyB3XwwJk",
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=60",
    duration: 18000,
    views: 2345678,
    creator: "testUser._id"
  },
  {
    title: "Mathematics - Calculus Explained Simply",
    description: "Understand calculus concepts clearly.",
    category: "Education",
    videoUrl: "https://www.youtube.com/embed/POXvoDM4qfI",
    thumbnailUrl: "https://images.unsplash.com/photo-1509228468518-180dd482180c?auto=format&fit=crop&w=800&q=60",
    duration: 3600,
    views: 1234567,
    creator: "testUser._id"
  },
  {
    title: "Web Development - Build Your First Website",
    description: "Learn HTML, CSS, and JavaScript.",
    category: "Education",
    videoUrl: "https://www.youtube.com/embed/ysEN5RaKOlQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=60",
    duration: 14400,
    views: 1876543,
    creator: "testUser._id"
  },

  // News Category
  {
    title: "Daily News Briefing - Today's Top Stories",
    description: "Stay updated with major global events.",
    category: "News",
    videoUrl: "https://www.youtube.com/embed/V_R1OSLB6nU",
    thumbnailUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=60",
    duration: 900,
    views: 234567,
    creator: "testUser._id"
  },
  {
    title: "Technology News - Latest Gadgets",
    description: "Breaking technology news and product reviews.",
    category: "News",
    videoUrl: "https://www.youtube.com/embed/zLr5Zk3xMvA",
    thumbnailUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60",
    duration: 1200,
    views: 456789,
    creator: "testUser._id"
  },

  // Entertainment Category
  {
    title: "Travel Vlog - Paradise Destination",
    description: "Explore a beautiful paradise destination.",
    category: "Entertainment",
    videoUrl: "https://www.youtube.com/embed/e3gfMrOKU4c",
    thumbnailUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
    duration: 2400,
    views: 1234567,
    creator: "testUser._id"
  },
  {
    title: "Cooking Show - Gourmet Meal Preparation",
    description: "Watch a professional chef prepare a meal.",
    category: "Entertainment",
    videoUrl: "https://www.youtube.com/embed/fKW_q7cXx3U",
    thumbnailUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=60",
    duration: 1800,
    views: 789012,
    creator: "testUser._id"
  }
];

    // Replace creator string with actual testUser ID
    const videosWithCreator = sampleVideos.map(video => ({
      ...video,
      creator: testUser._id
    }));

    const insertedVideos = await Video.insertMany(videosWithCreator);
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

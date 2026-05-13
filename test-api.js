import axios from 'axios';

async function testAPI() {
    try {
        console.log('Testing backend API...');
        const response = await axios.get('https://ai-mock-interview-73qo.onrender.com/health', { timeout: 5000 });
        console.log('✅ API is accessible:', response.status);
    } catch (error) {
        console.log('❌ API Error:', error.code, error.message);
        if (error.response) {
            console.log('Response status:', error.response.status);
        }
    }
}

testAPI();

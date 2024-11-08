import { navigateTo } from '../router.js';



export function renderLeftSidebar(appContainer) {
    console.log('from renderLeftSidebar');
    async function fetchFriends() {
        try {
            const response = await fetch('http://127.0.0.1:8000/friends/', {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching friends:', error);
            return [];
        }
    }

    // Render sidebar with fetched friends data
  // Render sidebar with fetched friends data
    async function renderSidebar(appContainer) {
        console.log("from from render side bar")
        const flag_2fa = await fetch_users('me').then(data => {
            console.log('data from fetch ',data);
            return data['user']['flag_2fa'];
        });
        const friendsData = await fetchFriends();
        console.log('Friends data:', friendsData);

        const friendsHTML = friendsData.map(friend => `
            <div class="friend-item">
                <img class="friend-avatar" src="http://127.0.0.1:8000${friend.picture}" alt="${friend.username}'s avatar"   width="40" height="40">
                <div class="online-indicator ${friend.status ? 'online' : 'offline'}"></div>
                <div class="friend-info">
                    <div class="friend-name">${friend.username}</div>
                    <!-- Status dot instead of text -->
                </div>
            </div>
        `).join('');

        const leftSidebarHTML = `
            <div class="left-sidebar">
                <h3>Online Friends</h3>
                <div class="friends-list">
                    ${friendsHTML || '<p>No friends online.</p>'}
                </div>
                <button id="logoutBtn" class="logout-btn">Logout</button>
            </div>
        `;
        document.getElementById('leftSidebar').innerHTML = leftSidebarHTML;
        document.getElementById('logoutBtn').addEventListener('click', event => handleLogoutBtn(event, appContainer));
        document.querySelectorAll('.friend-avatar').forEach(img => {
            img.addEventListener('click', function(event) {
                const username = event.target.getAttribute('alt').split("'s")[0];
                console.log("username",username)
                navigateTo(`/profile/${username}`, appContainer);
            }); 
        });
    }

    renderSidebar(appContainer);
}

// Handle logout button click
export function handleLogoutBtn(event, appContainer) {
    event.preventDefault();

    fetch('http://127.0.0.1:8000/logout/', {
        method: 'POST',
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(() => {
        console.log('Logged out successfully');
        navigateTo('/login', appContainer);  // Redirect to login page
    })
    .catch(error => {
        console.error('There was a problem with the logout operation:', error);
    });
}



export async function fetch_users(username) {
    console.log(`from fetch_usersee . getting ${username}'s data`)
    try {
        const response = await fetch(`http://127.0.0.1:8000/users/${username}`, {
            method: 'GET',
            credentials: 'include'
        });
        
        const data = await response.json();
        if (!response.ok) {
            return (data);
        }
        
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return data;
    }
}

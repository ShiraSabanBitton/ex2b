// Shira Saban Bitton - 316511658
// Fida Rabah - 204647911
// 25/6/24

// This script dynamically loads profile data and updates the HTML content of the profile page.
// It fetches data from the server and populates the page with profile images, descriptions, and other relevant information.

document.addEventListener("DOMContentLoaded", function() {
    const id = new URLSearchParams(window.location.search).get('id');

    fetch(`/profile-data?id=${id}`)
        .then(response => response.json())
        .then(data => {
            document.title = `${id} Profile`;

            // Set the banner image
            const bannerContainer = document.getElementById('bannerContainer');
            const banner = document.createElement('img');
            banner.src = `/${id}/banner.png`;
            banner.alt = 'banner';
            banner.style.width = '100%';
            bannerContainer.appendChild(banner);

            // Set the profile image
            const profileImageContainer = document.getElementById('profileImageContainer');
            const profileImage = document.createElement('img');
            profileImage.src = `/${id}/profile.png`;
            profileImage.alt = 'Profile Image';
            profileImage.classList.add('profile-img');
            profileImageContainer.appendChild(profileImage);

            // Set the title and description
            document.getElementById('titleText').textContent = data.titleText;
            document.getElementById('descText').innerHTML = data.descText;

            // Set the bio content
            const bioContent = document.getElementById('bioContent');
            data.htmlBioContent.forEach(item => {
                const p = document.createElement('p');
                p.innerHTML = item;
                bioContent.appendChild(p);
            });

            // Set image1 in center-content if it exists
            const image1Container = document.getElementById('image1Container');
            const image1 = document.createElement('img');
            image1.src = `/${id}/image1.png`;
            image1.alt = 'image1';
            image1Container.appendChild(image1);

            // Set image2 in bottom-area if it exists
            const image2Container = document.getElementById('image2Container');
            const image2 = document.createElement('img');
            image2.src = `/${id}/image2.png`;
            image2.alt = 'image2';
            image2.classList.add('endImg');
            image2Container.appendChild(image2);

            // Set the endorsement content
            const contentFiles = document.getElementById('contentFiles');
            data.contentFiles.forEach(item => {
                const p = document.createElement('p');
                p.classList.add('flex-container-Endorsement');
                p.innerHTML = item;
                contentFiles.appendChild(p);
            });

            // Set the other profiles
            const profilesNamesContainer = document.getElementById('profilesNames');
            data.profilesNames.forEach(profileName => {
                const a = document.createElement('a');
                a.href = `/profile?id=${profileName}`;
                const img = document.createElement('img');
                img.src = `/${profileName}/profile.png`;
                img.alt = profileName;
                img.classList.add('squad');
                a.appendChild(img);
                profilesNamesContainer.appendChild(a);
            });
        })
        .catch(error => console.error('Error fetching profile data:', error));
});
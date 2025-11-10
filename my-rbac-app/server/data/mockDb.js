const { ROLES } = require('../config/roles');

// The shared data store
let db = {
    users: [],
    posts: []
};

const seedDatabase = () => {
    console.log('--- Seeding In-Memory Database ---');
    
    db.users = [
        { id: 'u1', username: 'admin_user', password: 'password', role: ROLES.ADMIN },
        { id: 'u2', username: 'editor_john', password: 'password', role: ROLES.EDITOR },
        { id: 'u3', username: 'editor_jane', password: 'password', role: ROLES.EDITOR },
        { id: 'u4', username: 'viewer_bob', password: 'password', role: ROLES.VIEWER },
    ];

    db.posts = [
        { id: 1, title: 'Admin Global Policy', content: 'Only admins can manage this.', authorId: 'u1', status: 'published', authorName: 'Admin User' },
        { id: 2, title: 'John\'s Published Article', content: 'A general public post.', authorId: 'u2', status: 'published', authorName: 'Editor John' },
        { id: 3, title: 'John\'s Draft Idea', content: 'This is a private draft.', authorId: 'u2', status: 'draft', authorName: 'Editor John' },
        { id: 4, title: 'Jane\'s New Draft', content: 'Needs review before publishing.', authorId: 'u3', status: 'draft', authorName: 'Editor Jane' },
        { id: 5, title: 'Viewer Public News', content: 'Public news post for all.', authorId: 'u4', status: 'published', authorName: 'Viewer Bob' },
    ];
    console.log(`Database seeded with ${db.users.length} users and ${db.posts.length} posts.`);
};

module.exports = { db, seedDatabase };
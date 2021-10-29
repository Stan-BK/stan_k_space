export default {
  routes: [
    {
      name: 'game',
      child: [
        'MySnake',
        'My2048'
      ]
    },
    {
      name: 'info'
    },
    {
      name: 'article'
    }
  ],
  games: [
    'MySnake',
    'My2048'
  ]
}
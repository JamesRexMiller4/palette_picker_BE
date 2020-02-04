const users = [
  {username: 'Jarvis Blargus', password: 'password123'},
  {username: 'Chuck Norris', password: 'password123'},
  {username: 'Oprah Winfrey', password: 'password123'},
  {username: 'Banksy', password: 'password123'},
  {username: 'Leonardo Davinci', password: 'password123'},
  {username: 'Michelangelo', password: 'password123'},
  {username: 'Vincent Van Gogh', password: 'password123'},
  {username: 'Salvidor Dali', password: 'password123'},
  {username: 'David Bowie', password: 'password123'},
  {username: 'Scott Ertmer', password: 'password123'},
]


const data = [
  {username: 'Jarvis Blargus', password: 'password123', folders: [
    {folderName: 'Project #1', palettes: [
      {paletteName: 'Palette #1', colors: ['#80adaa', '#d9c9fb', '#9c5f3d', '#4ba9b3', '#a6617c']},
      {paletteName: 'Palette #2', colors: ['#80e56a', '#51c5c5', '#51ed3d', '#7f6851', '#826fb0']},
      {paletteName: 'Palette #3', colors: ['#80e56a', '#51c5c5', '#51ed3d', '#7f6851', '#826fb0']}
    ]},
    {folderName: 'Project #2', palettes: [
      {paletteName: 'Palette #1', colors: ['#80e56a', '#51c5c5', '#51ed3d', '#7f6851', '#826fb0']},
      {paletteName: 'Palette #2', colors: ['#80adaa', '#d9c9fb', '#9c5f3d', '#4ba9b3', '#a6617c']}, 
      {paletteName: 'Palette #3', colors: ['#db88e5', '#f09231', '#e1c902', '#9b8603', '#160c54']},
    ]},
    {folderName: 'Project #3', palettes: [
      {paletteName: 'Palette #1', colors: ['#6ce8c8', '#b8a7d1', '#258fd5', '#ceb025', '#b09d5e']},
      {paletteName: 'Palette #2', colors: ['#47e18d', '#75880e', '#3560fe', '#989a53', '#5e5ed4']},
      {paletteName: 'Palette #3', colors: ['#0441af', '#f5933e', '#0318e1', '#576f1d', '#0d3c03']},
    ]}]
  },
  {username: 'Banksy', password: 'password123', folders: [
    {folderName: 'Project #1', palettes: [ 
      {paletteName: 'Palette #1', colors: ['#c90629', '#30d60f', '#a18dc1', '#8ea780', '#43c877']},
      {paletteName: 'Palette #2', colors: ['#c0d1ea', '#933016', '#35d018', '#f87f3f', '#b9481e']},
      {paletteName: 'Palette #3', colors: ['#3b29f5', '#ce73e5', '#df70b6', '#e39cbf', '#f6b26d']},
    ]},
    {folderName: 'Project #2', palettes: [
      {paletteName: 'Palette #1', colors: ['#3b29f5', '#ce73e5', '#df70b6', '#e39cbf', '#f6b26d']},
      {paletteName: 'Palette #2', colors: ['#db88e5', '#f09231', '#e1c902', '#9b8603', '#160c54']},
      {paletteName: 'Palette #3', colors: ['#80adaa', '#d9c9fb', '#9c5f3d', '#4ba9b3', '#a6617c']},
    ]},
    {folderName: 'Project #3', palettes: [
      {paletteName: 'Palette #1', colors: ['#80e56a', '#51c5c5', '#51ed3d', '#7f6851', '#826fb0']},
      {paletteName: 'Palette #2', colors: ['#47e18d', '#75880e', '#3560fe', '#989a53', '#5e5ed4']},
      {paletteName: 'Palette #3', colors: ['#6ce8c8', '#b8a7d1', '#258fd5', '#ceb025', '#b09d5e']},
    ]}]
  },
  {username: 'Scott Ertmer', password: 'password123', folders: [
    {folderName: 'Project #1', palettes: [
      {paletteName: 'Palette #1', colors: ['#0441af', '#f5933e', '#0318e1', '#576f1d', '#0d3c03']},
      {paletteName: 'Palette #2', colors: ['#c90629', '#30d60f', '#a18dc1', '#8ea780', '#43c877']},
      {paletteName: 'Palette #3', colors: ['#c0d1ea', '#933016', '#35d018', '#f87f3f', '#b9481e']},
    ]},
    {folderName: 'Project #2', palettes: [
      {paletteName: 'Palette #1', colors: ['#3b29f5', '#ce73e5', '#df70b6', '#e39cbf', '#f6b26d']},
      {paletteName: 'Palette #2', colors: ['#db88e5', '#f09231', '#e1c902', '#9b8603', '#160c54']},
      {paletteName: 'Palette #3', colors: ['#80adaa', '#d9c9fb', '#9c5f3d', '#4ba9b3', '#a6617c']},
    ]},
    {folderName: 'Project #3', palettes: [
      {paletteName: 'Palette #1', colors: ['#80e56a', '#51c5c5', '#51ed3d', '#7f6851', '#826fb0']},
      {paletteName: 'Palette #1', colors: ['#6ce8c8', '#b8a7d1', '#258fd5', '#ceb025', '#b09d5e']},
      {paletteName: 'Palette #1', colors: ['#47e18d', '#75880e', '#3560fe', '#989a53', '#5e5ed4']},
    ]}]
  }
]
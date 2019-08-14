import scrapy 

class TennisBios(scrapy.Spider):
  name = 'tennis_bios'

  def start_requests(self):
    urls = [
      'http://www.espn.com/tennis/players'
    ]
    for url in urls:
      yield scrapy.Request(url=url, callback=self.parse)

  def parse(self, response):
    player_links = response.css('tr>td>a::attr(href)').getall()

    for link in player_links:
      link = response.urljoin(link)
      yield scrapy.Request(link, callback=self.parse_player_page)

  def parse_player_page(self, response):
    born = '--'
    hometown = '--'

    meta_data = response.css('ul.player-metadata>li::text').getall()
    rows = response.css('ul.player-metadata>li>span::text').getall()
    for i in range(len(rows)):
      if (rows[i] == 'Birth Date'):
        if len(meta_data) > i:
          born = meta_data[i]
      if (rows[i] == 'Hometown'):
        if len(meta_data) > i:
          hometown = meta_data[i]
    
    if born == '--' and hometown == '--':
      return

    yield {
      'name': response.css('h1::text').get(),
      'born': born,
      'hometown': hometown,
      'league': 'tennis'
    }
         


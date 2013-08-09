import getpass
import gdata.photos.service
import os.path
import re
import time

FILE='TI_calculator_simulator.html'
FILE2=FILE.replace('.html', '2.html')
DIR='.'
ALBUM='calculator'
DATE = '2013-04-01'

used = {}

def resize(url, size):
    l = url.split('/')
    l[-1:-1] = [size]
    return '/'.join(l)


def cleanup():
    f = open(os.path.join(DIR, FILE))
    out = open(os.path.join(DIR, FILE2), 'w')
    mode = 0
    for l in f:
        m = re.search('<img.*src=.*/([^/]+.png)"', l)
        if 'picasaweb' in l and m:
            mode = m.group(1)
            used[mode] = 1
            width = '400'
            m = re.search('width=(\d+)', l)
            if m:
                width = m.group(1)
            else:
                m = re.search('/s(\d+)/', l)
                if m:
                    width = m.group(1)
        if mode:
            if '</a>' in l:
                if photohtml.has_key(mode):
                  html = photohtml[mode]
                  html = html.replace('width="400"', 'width="%s"' % width)
                  html = html.replace('height="400"', 'height="%s"' % width)
                  html = html.replace('/s400/', '/s%s/' % width)
                  out.write(html)
                else:
                  print 'XXX missing key', mode
                mode = None
        else:
            out.write(l)
    for k in photohtml.keys():
        if k not in used:
            out.write('\n<p>--------------\n<p>\n')
            out.write(photohtml[k])
    f.close()
    out.close()
        

gd_client = gdata.photos.service.PhotosService()
username = 'ken.shirriff@gmail.com'
password = "gsbkxsveoztzjbiq" or getpass.getpass('password: ')
gd_client.ClientLogin(username, password)

albums = gd_client.GetUserFeed()
album = [e for e in albums.entry if e.title.text == ALBUM][0]

photohtml = {}
photos = gd_client.GetFeed(
    '/data/feed/api/user/%s/albumid/%s?kind=photo' % (
        username, album.gphoto_id.text))
for photo in photos.entry:
  if photo.title.text in photohtml: print 'collision on', photo.title.text
  if photo.timestamp.isoformat() < DATE: continue
  if photo.summary.text:
    text = photo.summary.text.replace('"', '\'')
  else:
    text = ""
    print 'No text for', photo.title.text
  src = resize(photo.GetMediaURL(), 's400')
  href = photo.GetHtmlLink().href.replace('#', '?noredirect=1#')
  if int(photo.height.text) <= int(photo.width.text):
      dim = 'width="400"'
  else:
      dim = 'height="400"'
  photohtml[photo.title.text] = """<a href="%s"><img class="hilite" src="%s" %s
alt="%s"\ntitle="%s">
</a>
<p>
<div class="cite">
%s
</div>
<p>""" %(href, src, dim, text, text, text)

cleanup()


        



import math

# .1 loop



def alg1():
  cs = [1, 0]
  a = 0
  for i in range(0, 11):
      print a, cs, math.cos(a), math.sin(a)
      cs = [cs[0] * .995 - cs[1] * .1005, cs[0] * .1005 + cs[1] * .995]
      a += .1

def alg2():
  cs = [1, 0]
  a = 0
  for i in range(0, 11):
      print a, cs, math.cos(a), math.sin(a)
      cs[0] = cs[0] * .995 - cs[1] * .101005
      cs[1] = cs[0] * .101005 + cs[1] * .995
      a += .1

def alg3():
  cs = [1, 0]
  a = 0
  for i in range(0, 11):
      print a, cs, math.cos(a), math.sin(a)
      cs[1] = cs[0] * .1005 + cs[1] * 1.0051
      cs[0] = cs[0] * 1.0051 - cs[1] * .1005
      a += .1



def arccos(x):
    c = 1
    s = 0
    a = 0
    while a < 10:
        c = c - s / 1000.
        s = s - s / 1000000.
        a = a + .001
        s = s + c / 1000.
        c = c - c / 1000000.
        if c < x or x == 0:
            return a
        
def arccos2(x):
    c = 1
    s = 0
    a = 0
    while a < 10:
        a = a + .001
        s += c / 1000.
        s - s / 1000000.
        c -= c / 100000.
        c -= s/ 1000.

        if c < x or x == 0:
            return a

def sincos1(a):
    c = 999999
    s = 0
    a = a * 1000        

    while (a >= 0):
        a -= 1
        s += c / 1000
        c -= s / 1000

    return c / 1000000., s / 1000000.

def sincos(a):
    c = 1000000
    s = 0
    a = a * 1000        
    while (a >= 0):
        a -= 1
        c -= s / 1000
        s += c / 1000
    return s / 1000000., c/ 1000000.

d = 1000.
c = -math.log(1 - 1/d, 10)
print 'c =', c
def log0(x):
    t = 0
    while x > 1:
        x = x - x / d
        t += 1
    return t * c

d = 1000.

c = math.log(1 + 1/d, 10)
def log1(x):
    t = 0
    x = int(x * 100000)
    while x > 100000:
        x = x - x / 1000
        t += 1
    return t * c

def antilog(t):
    t = int((1.-t) / c)
    print 't=', t
    x = 1000000
    while t > 0:
        t -= 1
        x = x - x / 1000

    return x / 100000.
        

for a in [.9, .1, .01, .001, .0001, .00001]:
    print a, antilog(a), 10**a
    
sys.exit(0)

for a in [1.0001, 1.001, 1.01, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9.99999]:
    print a, log1(a), math.log(a, 10)
    
sys.exit()

#for a in [0, .1, .2, .3, .4, .5, .0019, .0021, .003, .004, .005, .006, .007, .008, .0081, .0085,
#.0086, .0087, .0089, .009, .0099]:
#    print a, arccos(a)

#alg1()
print '-----------'
#alg2()
print '-------------'
#alg3()
print '-------------'

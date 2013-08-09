import re

oplist = {}
masklist = {}

def add(data, key, val):
    if key in data:
        if val not in data[key]:
            data[key].append(val)
    else:
        data[key] = [val]
        


#starting at 16
        # SYNC == SYNCH, SCAN == SCANNO
flagops = ['NOP', 'WAITDK', 'WAITNO', 'SFB', 'SFA', 'SYNC', 'SCAN',
           'ZFB', 'ZFA', 'TFB', 'TFA', 'FFB', 'FFA', 'CF', 'NOP', 'EXF']

aluops = ['AABA', 'AAKA', 'AAKC', 'ABOA', 'ABOC', 'ACKA', 'ACKB', 'SABA',
          'SABC', 'SAKA', 'SCBC', 'SCKC', 'CAB', 'CAK', 'CCB', 'CCK', 'AKA', 'AKB',
          'AKC', 'EXAB', 'SLLA', 'SLLB', 'SLLC', 'SRLA', 'SRLB', 'SRLC',
          'AKCN', 'AAKAH', 'SAKAH', 'ACKC']

jmp0ops= ['BIU', 'BIZ', 'BIGE', 'BINC', 'BIE', 'BET']

jmp1ops = ['BID', 'BIO', 'BILT', 'BIC', 'BINE']

optab = {}
for i in range(0, len(flagops)):
    optab[flagops[i]] = 0x500 |(i << 4)

for i in range(0, len(aluops)):
    optab[aluops[i]] = 0x600 | (i << 4)

for op in jmp0ops:
    optab[op] = 0

for op in jmp1ops:
    optab[op] = 0x200

optab['BKO'] = 0x400

optab['BKP'] = 0x480

"""
masks = [
    ['OP1', 'DPT7'],
    ['TIM4', 'ID5', 'OP2'],
    ['LSD1', 'OP3'],
    ['F3'],
    ['F4'],
    ['F5'],
    ['SIGN'],
    ['ID3', 'F9'],
    ['OV1', 'F10', 'FD4'],
    ['OPFGS'],
    ['MSD1', 'FD'],
    ['MANT1'],
    ['MANT'],
    ['EXP1'],
    ['EXP'],
    ['ALL']
         ]
         

masktab = {}
for i in range(0, 16):
    for mask in masks[i]:
        masktab[mask] = i
"""

masktab = {}

def binfmt(n):
    b = "{0:011b}".format(n)
    return b[0:2] + ' ' + b[2:7] + ' ' + b[7:]

def parseline(line):
    line = line.replace('AKCM', 'AKCN').replace('TEA', 'TFA') # typo
    line = line.replace('.FD1\tACKA', '.FD1\tACKC')

    m = re.match('(\d \d{4} \d{4})\s+(\S+)\s+(\d{2} \d{5} \d{4})\s+(.*)', line)
    if m:
        addr = m.group(2)
        op = m.group(3)
        ops = re.split('\s+', m.group(4))
        if ops[0][0] == '.':
            label = ops[0]
            opcode = ops[1]
            opval = ops[2] if len(ops) > 2 else ''
        else:
            label = ''
            opcode = ops[0]
            opval = ops[1] if len(ops) > 1 else ''
        return [addr, op, label, opcode, opval]
    else:
        return [None]*5

labels = {}
def parselabels():
    f = open('calculator_source_edit_6.asm', 'r')
    for line in f:
        [addr, op, label, opcode, opval] = parseline(line)
        if label:
            labels[label[1:]] = int(addr, 16)

def parseequ():
    f = open('calculator_source_edit_6.asm', 'r')
    for line in f:
        m = re.search('(\S+)\s+EQU\s+(\S+)', line)
        if m:
            equname = m.group(1)
            equvalue = m.group(2)
            if re.match('\d+$', equvalue):
                masktab[equname] = int(equvalue)
            else:
                masktab[equname] = masktab[equvalue]

def asm():
    parseequ()
    parselabels()
    f = open('calculator_source_edit_6.asm', 'r')
    for line in f:
        [addr, op, label, opcode, opval] = parseline(line)
        if addr:
            if opcode in optab:
                opnum = optab[opcode]
                if opcode in aluops or opcode in flagops:
                    if opval:
                        opnum |= masktab[opval]
                elif opval:
                    if opval in labels:
                        opnum |= labels[opval]
                    else:
                        print 'BAD LABEL', opval
                opbin = binfmt(opnum)
                if opbin == op:
                    if opcode in ['SFA', 'SFB', 'ZFA', 'ZFB', 'TFA', 'TFB', 'FFA', 'FFB', 'CF', 'EXF']:
                        mask = int(op[9:], 2)
                        print addr, op, mask, label, opcode, opval
                    pass
                else:
                    print line
                    print addr, op, label, opcode, opval
                    print '????', binfmt(opnum)
            else:
                print 'BAD OP', opcode                     


def collect():
    f = open('calculator_source_edit_6.asm', 'r')
    for line in f:
        [addr, op, label, opcode, opval] = parseline(line)
        if addr:
            print addr, op, label, opcode, opval
            if op[0] == '0':
                add(oplist, op[0:2], opcode)
            elif op[1] == '0' and op[3] == '0':
                add(oplist, op[0:5], opcode)
            else:
                add(oplist, op[0:8], opcode)
                add(masklist, op[9:], opval)
    keys = labels.keys()
    keys.sort()
    for key in keys:
        print labels[key], key

    print

    keys = oplist.keys()
    keys.sort()
    for key in keys:
        print key, oplist[key]
            
    print
    keys = masklist.keys()
    keys.sort()
    for key in keys:
        print key, masklist[key]

        
asm()



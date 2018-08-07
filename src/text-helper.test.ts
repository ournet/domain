import test from 'ava';
import { TextHelper } from './text-helper';

test('#isAbbr', t => {
    t.is(TextHelper.isAbbr('ABBR'), true, 'ABBR is an abbreviation')
    t.is(TextHelper.isAbbr('aBBR'), false, 'aBBR is not an abbreviation')
    t.is(TextHelper.isAbbr('A Abbr'), false, 'A Abbr is not an abbreviation')
    t.is(TextHelper.isAbbr('A ABBR'), true, 'A ABBR is an abbreviation')
    t.is(TextHelper.isAbbr('189 & 9'), false, '189 & 9 not abbreviation')
})

test('#removeSymbols', t => {
    t.is(TextHelper.removeSymbols('Async (node)'), 'Async node')
    t.is(TextHelper.removeSymbols('iPhone #5'), 'iPhone 5')
    t.is(TextHelper.removeSymbols('iPhone & -= &&'), 'iPhone')
    t.is(TextHelper.removeSymbols('iPhone $^@^%*#^*(#()*#_*_)(@_)(@ &+-iPad'), 'iPhone iPad')
})

test('#countWords', t => {
    t.is(TextHelper.countWords('Async (node)'), 2)
    t.is(TextHelper.countWords('iPhone alfa'), 2)
    t.is(TextHelper.countWords('Ștefan'), 1)
    t.is(TextHelper.countWords('iPhone 2'), 2)
    t.is(TextHelper.countWords(''), 0)
})
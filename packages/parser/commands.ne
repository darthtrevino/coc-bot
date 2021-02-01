@{%  
  function makeBonusOrPenalty(type, value) {
    if (type === "bonus") {
      return { bonusDice: value }
    } else if (type === "penalty") {
      return { penaltyDice: value }
    } else {
      throw new Error(`could not handle bonusOrPenalty type ${type} `)
    }
  }
%}

command -> 
  rollCommand {% d => d[0] %}

rollCommand -> 
  _ roll __ abilitySpec _ {% d => ({ command: 'roll', ability: d[3] }) %}
  | _ roll __ abilitySpec  __ withBonusOrPenaltyDice _ {% d => ({ command: 'roll', ability: d[3], ...d[5] }) %}

withBonusOrPenaltyDice ->
  with __ bonusOrPenalty _ {% d => makeBonusOrPenalty(d[2].type, 1) %}
  | with __ bonusOrPenalty _ dice {% d => makeBonusOrPenalty(d[2].type, 1) %}
  | with __ PosInt __ bonusOrPenalty {% d => makeBonusOrPenalty(d[4].type, d[2].literal) %}
  | with __ PosInt __ bonusOrPenalty _ dice {% d => makeBonusOrPenalty(d[4].type, d[2].literal) %}

bonusOrPenalty -> 
  bonus {% d => ({type: 'bonus' }) %}
  | penalty {% d=> ({ type: 'penalty' }) %}

roll -> "roll"
with -> "with"
bonus -> "bonus"
penalty -> "penalty"
dice -> "dice" | "die"
on -> "on" | "against"

abilitySpec -> 
  ability {% d => d[0] %}
  | on __ ability {% d => d[2] %}

ability ->
  PosInt {% d => d[0].literal %} 
  | String {% d => d[0] %}
  

# Primitives
# ==========
 
# Numbers
PosInt -> _posint {% d => ({ literal: parseFloat(d[0]) }) %}
Int -> _int {% d => ({ literal: parseFloat(d[0]) }) %}
Float -> _float {% d => ({ literal: parseFloat(d[0])}) %}
Number -> _number {% d => ({ literal: parseFloat(d[0])}) %}

_posint ->
	[0-9] {% id %}
	| _posint [0-9] {% d => d[0] + d[1] %}
 
_int ->
	"-" _posint {% d => d[0] + d[1] %}
	| _posint {% id %}

_float ->
	_int {% id %}
	| _int "." _posint {% d =>d[0] + d[1] + d[2] %}
 
_number ->
	_float {% id %}
	| _float "e" _int {% d => d[0] + d[1] + d[2] %}
 
 
# Strings
 
String -> 
  "\"" _string "\"" {% d => d[1] %}
  | "'" _string "'" {% d => d[1] %}
 
_string ->
	null {% () => "" %}
	| _string _stringchar {% d => d[0] + d[1] %}
 
_stringchar ->
	[^\\"] {% id %}
	| "\\" [^] {% d => JSON.parse("\"" + d[0] + d[1] + "\"") %}

# Whitespace
_ -> null | _ [\s] {% () => null %}
__ -> [\s] | __ [\s] {% () => null %}
from typing import Dict, NamedTuple, Tuple, TypedDict, Union, Optional

from django import forms


class OptgroupMember(NamedTuple):
    name: str
    value: Union[str, int, bool, None]
    label: str
    selected: bool


Optgroup = Tuple[None, Tuple[OptgroupMember], int]


Widget = Union[
    forms.HiddenInput,
    forms.TextInput,
    forms.NumberInput,
    forms.URLInput,
    forms.TimeInput,
    forms.DateInput,
    forms.CheckboxInput,
    forms.PasswordInput,
    forms.EmailInput,
    forms.Textarea,
    forms.Select,
    forms.SelectMultiple,
    forms.ClearableFileInput,
    forms.SelectDateWidget,
    forms.SplitDateTimeWidget,
]


class URL(TypedDict):
    route: str
    args: Dict[str, str]


URLSchema = Dict[str, URL]


class RPCMember(TypedDict):
    instance: Optional[str]
    url: str
    input: str
    output: str


RPCSchema = Dict[str, RPCMember]


class Types(NamedTuple):
    Widget: Widget
    Optgroup: Optgroup
    URLSchema: URLSchema
    RPCSchema: RPCSchema

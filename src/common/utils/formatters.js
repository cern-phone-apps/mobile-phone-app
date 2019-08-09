import React from 'react';
import { Icon } from 'react-native-elements';

export function formatUserOrganization(profile) {
  const organization = [];

  if (profile.division && profile.division !== '[]')
    organization.push(profile.division);
  if (profile.cernGroup && profile.cernGroup !== '[]')
    organization.push(`${profile.cernGroup}`);
  if (profile.cernSection && profile.cernSection !== '[]')
    organization.push(`${profile.cernSection}`);

  return organization.join('-');
}

export const formatResultsOneLinePerPhone = (
  results,
  { saveAction, localList }
) => {
  const searchResults = [];
  let index = 1;
  results.map(item => {
    console.log('LOOK HERE FOR RESULTS MAP');
    console.log(results);
    if (item.phones) {
      const phones = item.phones.filter(
        phone => phone.number && phone.number !== undefined
      );

      phones.map(phone => {
        console.log(localList);
        const isAlreadySelected = !!localList.find(
          number => number.value === phone.number
        );

        const rightIcon = isAlreadySelected ? (
          <Icon type="font-awesome" name="check-square" color="green" />
        ) : (
          <Icon
            type="font-awesome"
            name="plus"
            onPress={() => {
              if (!isAlreadySelected) {
                saveAction(phone.number);
              }
            }}
          />
        );
        index += 1;
        const result = {
          id: `phone-${index}`,
          subtitle: `${item.displayName} (${formatUserOrganization(item)})`,
          title: phone.number,
          leftIcon: {
            name: phone.phoneType === 'mobile' ? 'mobile' : 'phone',
            type: 'font-awesome'
          },
          bottomDivider: true,
          rightIcon
        };
        searchResults.push(result);
        return result;
      });
      return searchResults;
    }
    return searchResults;
  });
  return searchResults;
};

export function contactsFormatter(
  results,
  selection,
  addUser,
  getSelectedUsers
) {
  return results.map(item => {
    const isAlreadySelected = !!selection.find(
      user => parseInt(user.personId, 10) === parseInt(item.personId, 10)
    );
    const rightIcon = isAlreadySelected ? (
      <Icon type="font-awesome" name="check-square" color="green" />
    ) : (
      <Icon
        type="font-awesome"
        name="plus"
        onPress={() => addUser(item).then(() => getSelectedUsers())}
      />
    );

    return {
      id: item.personId,
      title: `${item.displayName} (${item.division})`,
      leftIcon: { name: 'user', type: 'font-awesome' },
      bottomDivider: true,
      rightIcon
    };
  });
}

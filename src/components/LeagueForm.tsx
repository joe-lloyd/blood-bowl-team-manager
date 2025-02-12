import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useUser } from '@/contexts/userContext';
import { db } from '@/services/firebase';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { League, Season } from '@/types/league';
import { uuidv4 } from '@firebase/util';
import { useRouter } from 'next/router';

const FormWrapper = styled.div`
  padding: 20px;
  border: 2px solid #1d3860;
  background-color: #e0f0ff;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border: 2px solid #1d3860;
`;

const Button = styled.button`
  margin: 10px 0;
  padding: 10px;
  background-color: #1d3860;
  color: white;
  border: none;
  cursor: pointer;
`;

const Select = styled.select`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border: 2px solid #1d3860;
`;

const SelectedTeamsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SelectedTeamItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  padding: 10px;
  border: 1px solid #1d3860;
  background-color: #f0f8ff;
`;

const RemoveButton = styled.button`
  background-color: #922d26;
  color: white;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
`;

interface TeamSelect {
  label: string;
  value: string;
}

const LeagueForm: React.FC<{ leagueId: string }> = ({ leagueId }) => {
  const router = useRouter();
  const user = useUser();
  const [leagueName, setLeagueName] = useState('New League');
  const [description, setDescription] = useState('My League');
  const [seasonName, setSeasonName] = useState('Season 1');
  const today = new Date().toISOString().split('T')[0];
  const oneYearFromToday = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  )
    .toISOString()
    .split('T')[0];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(oneYearFromToday);
  const [teams, setTeams] = useState<TeamSelect[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<TeamSelect[]>([]);

  useEffect(() => {
    if (user) {
      const fetchTeams = async () => {
        const teamsCollection = collection(db, `users/${user.uid}/teams`);
        const teamsSnapshot = await getDocs(teamsCollection);
        const teamsList = teamsSnapshot.docs
          .map((doc) => ({
            value: doc.ref.path,
            label: doc.data().teamName,
          }))
          .filter(({ label }) => !!label) as TeamSelect[];
        setTeams(teamsList);
      };

      fetchTeams();
    }
  }, [user]);

  const handleAddTeam = (selectedTeam) => {
    const teamToAdd = teams.find((team) => team.value === selectedTeam);
    if (
      teamToAdd &&
      !selectedTeams.some((team) => team.value === selectedTeam)
    ) {
      setSelectedTeams([...selectedTeams, teamToAdd]);
      // setSelectedTeam('');
    }
  };

  const handleRemoveTeam = (teamValue: string) => {
    setSelectedTeams(selectedTeams.filter((team) => team.value !== teamValue));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user) {
      console.error('User not found');
      return;
    }

    const seasonId = uuidv4();
    const newSeason: Season = {
      seasonId,
      seasonName,
      startDate,
      endDate,
      teams: selectedTeams.map((team) => team.value),
      games: [],
    };

    const leagueData: League = {
      id: leagueId,
      leagueName,
      description,
      createdBy: user.uid,
      createdAt: new Date().toISOString(),
      seasons: [newSeason],
    };

    try {
      await setDoc(doc(db, 'users', user.uid, 'leagues', leagueId), leagueData);
      router.push(`/my-leagues/${leagueId}`);
    } catch (error) {
      alert(`Error creating league: ${error}`);
    }
  };

  return (
    <FormWrapper>
      <h2>Create New League</h2>
      <form onSubmit={handleSubmit}>
        <label>
          League Name:
          <Input
            type="text"
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <h3>First Season</h3>
        <label>
          Season Name:
          <Input
            type="text"
            value={seasonName}
            onChange={(e) => setSeasonName(e.target.value)}
            required
          />
        </label>
        <label>
          Start Date:
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        <label>
          End Date:
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>
        <h3>Add Teams</h3>
        <label>
          Select Existing Team:
          <Select
            value={''}
            onChange={(e) => {
              handleAddTeam(e.target.value);
            }}
          >
            <option value="">Select a team</option>
            {teams.map((team) => (
              <option key={team.value} value={team.value}>
                {team.label}
              </option>
            ))}
          </Select>
        </label>
        <SelectedTeamsList>
          {selectedTeams.map((team) => (
            <SelectedTeamItem key={team.value}>
              {team.label}
              <RemoveButton onClick={() => handleRemoveTeam(team.value)}>
                Remove
              </RemoveButton>
            </SelectedTeamItem>
          ))}
        </SelectedTeamsList>
        <Button type="submit">Create League</Button>
      </form>
    </FormWrapper>
  );
};

export default LeagueForm;
